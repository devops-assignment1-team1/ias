const supertest = require('supertest')
const app = require('../server.js')
const request = supertest(app)
const fs = require('fs')
const path = require('path')
const os = require('os')
const Excel = require('exceljs')

describe('student test suite', () => {
  test('tests get /students endpoint', async () => {
    const response = await request.get('/api/v1/students')
    expect(response.statusCode).toBe(200)
    expect(response.body.length >= 0).toBeTruthy()
  })

  test('tests get /students filter status (UNASSIGNED) endpoint', async () => {
    const response = await request.get('/api/v1/students?status=UNASSIGNED')
    expect(response.statusCode).toBe(200)

    const statuses = []
    response.body.forEach((student) => {
      if (student.status === 'UNASSIGNED') return
      statuses.push(student.status)
    })

    expect(statuses.length === 0).toBeTruthy()
  })

  test('tests get /students filter status (PENDING_CONFIRMATION) endpoint', async () => {
    const response = await request.get(
      '/api/v1/students?status=PENDING_CONFIRMATION'
    )
    expect(response.statusCode).toBe(200)

    const statuses = []
    response.body.forEach((student) => {
      if (student.status === 'PENDING_CONFIRMATION') return
      statuses.push(student.status)
    })

    expect(statuses.length === 0).toBeTruthy()
  })

  test('tests get /students filter status (CONFIRMED) endpoint', async () => {
    const response = await request.get('/api/v1/students?status=CONFIRMED')
    expect(response.statusCode).toBe(200)

    const statuses = []
    response.body.forEach((student) => {
      if (student.status === 'CONFIRMED') return
      statuses.push(student.status)
    })

    expect(statuses.length === 0).toBeTruthy()
  })

  test('tests patch /students endpoint', async () => {
    const payload = {
      students: [
        {
          student_id: 'S12345670A',
          status: 'PENDING_CONFIRMATION',
          company_id: '1'
        },
        {
          student_id: 'S12345671B',
          status: 'PENDING_CONFIRMATION',
          company_id: '2'
        }
      ]
    }
    const response = await request
      .patch('/api/v1/students')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(200)
  })

  test('tests patch /students endpoint domain constraints violated', async () => {
    const payload = {
      students: [
        {
          student_id: 'S12345670A',
          status: 'ABCD',
          company_id: '1'
        }
      ]
    }
    const response = await request
      .patch('/api/v1/students')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Database Error')
  })

  test('tests patch /students endpoint foreign key constraints violated', async () => {
    const payload = {
      students: [
        {
          student_id: 'S12345670A',
          status: 'PENDING_CONFIRMATION',
          company_id: 'INVALID'
        }
      ]
    }
    const response = await request
      .patch('/api/v1/students')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Database Error')
  })

  test('tests patch /students endpoint missing "students" in payload', async () => {
    const payload = {}
    const response = await request
      .patch('/api/v1/students')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Missing students')
  })

  test('tests patch /students endpoint "students" array is length 0', async () => {
    const payload = {
      students: []
    }
    const response = await request
      .patch('/api/v1/students')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Database Error')
  })

  test('tests post /students/generateEmail', async () => {
    let payload = {
      email_dir: 'eexports/email',
      resume_dir: 'eexports/resume',
      internship_period: '02/12/2023 - 10/12/2024'
    }
    response = await request
      .post('/api/v1/settings')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200)

    let payload2 = {
      students: [
        {
          student_id: 'S12345670A',
          status: 'PENDING_CONFIRMATION',
          company_id: '1'
        },
        {
          student_id: 'S12345671B',
          status: 'PENDING_CONFIRMATION',
          company_id: '2'
        }
      ]
    }
    let response2 = await request
      .patch('/api/v1/students')
      .send(payload2)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response2.statusCode).toBe(200)

    const userHomeDir = os.homedir()
    expect(
      fs.existsSync(
        path.join(userHomeDir, 'eexports/email', '02-12-2023 to 10-12-2024')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(userHomeDir, 'eexports/resume', '02-12-2023 to 10-12-2024')
      )
    ).toBe(true)

    var response = await request
      .post('/api/v1/students/generateEmail')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.text).missingResume.length > 0).toBeTruthy()
    expect(
      fs.existsSync(
        path.join(
          userHomeDir,
          'eexports/email',
          '02-12-2023 to 10-12-2024',
          `${JSON.parse(response.text).missingResume[0]}.msg`
        )
      )
    ).toBe(true)

    try {
      fs.unlinkSync(
        path.join(
          userHomeDir,
          'eexports/resume',
          '02-12-2023 to 10-12-2024',
          'Student 1.pdf'
        )
      )
    } catch {}

    fs.copyFileSync(
      `${__dirname}/mock/Student 1.pdf`,
      path.join(
        userHomeDir,
        'eexports/resume',
        '02-12-2023 to 10-12-2024',
        'Student 1.pdf'
      )
    )

    var response = await request
      .post('/api/v1/students/generateEmail')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(200)
    expect(
      JSON.parse(response.text).missingResume.includes('Student 1')
    ).toBeFalsy()
    expect(
      fs.existsSync(
        path.join(
          userHomeDir,
          'eexports/email',
          '02-12-2023 to 10-12-2024',
          `${JSON.parse(response.text).missingResume[0]}.msg`
        )
      )
    ).toBe(true)
  })

  test('test post /students/upload', async () => {
    const payload = {
      email_dir: 'eexports/email',
      resume_dir: 'eexports/resume',
      internship_period: '02/12/2023 - 10/12/2024'
    }
    response = await request
      .post('/api/v1/settings')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200)

    response = await request
      .post('/api/v1/students/upload')
      .attach('student', `${__dirname}/mock/StudentData.xlsx`)

    const userHomeDir = os.homedir()
    const workbook = new Excel.Workbook()

    expect(
      fs.existsSync(
        path.join(
          userHomeDir,
          'backup/internshipData/students',
          '02-12-2024 to 10-12-2024',
          'StudentData.xlsx'
        )
      )
    ).toBe(true)

    await workbook.xlsx
      .readFile(
        path.join(
          userHomeDir,
          'backup/internshipData/students',
          '02-12-2024 to 10-12-2024',
          'StudentData.xlsx'
        )
      )
      .then(async () => {
        response = await request.get('/api/v1/students')
        expect(response.body.length).toBe(4)
      })
  })

  test('test post /students/upload missing status', async () => {
    const payload = {
      email_dir: 'eexports/email',
      resume_dir: 'eexports/resume',
      internship_period: '02/12/2023 - 10/12/2024'
    }
    response = await request
      .post('/api/v1/settings')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(200)

    response = await request
      .post('/api/v1/students/upload')
      .attach('student', `${__dirname}/mock/StudentData - Missing Status.xlsx`)

    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Missing Headers')

    const userHomeDir = os.homedir()
    const workbook = new Excel.Workbook()

    expect(
      fs.existsSync(
        path.join(
          userHomeDir,
          'backup/internshipData/students',
          '02-12-2024 to 10-12-2024',
          'StudentData - Missing Status.xlsx'
        )
      )
    ).toBe(true)

    await workbook.xlsx
      .readFile(
        path.join(
          userHomeDir,
          'backup/internshipData/students',
          '02-12-2024 to 10-12-2024',
          'StudentData - Missing Status.xlsx'
        )
      )
      .then(async () => {
        response = await request.get('/api/v1/students')
        expect(response.body.length).toBe(4) //supposed to be 8 but since fail, then not updated, so stay as 4
      })
  })
})
