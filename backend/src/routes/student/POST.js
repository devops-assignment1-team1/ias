const con = require('../../db')
const utils = require('../../utils')
const path = require('path')
const msg = require('./msg')
const returnSuccess = utils.returnSuccess
const returnError = utils.returnError
const express = require('express')
const router = express.Router()
const fs = require('fs')
const fsExtra = require('fs-extra')
const os = require('os')
const userHomeDir = os.homedir()
const axios = require('axios')
const Excel = require('exceljs')

const POST = router.post('/generateEmail', async (req, res) => {
  console.log('/generateEmail (POST)')

  const system_settings = (
    await con.promise().query(`SELECT * FROM system_settings`)
  )[0]

  const students = (
    await con.promise().query(
      `
        SELECT * FROM student
        INNER JOIN
        company on student.company_id = company.company_id
        WHERE
        student.status = 'PENDING_CONFIRMATION';
        `
    )
  )[0]

  try {
    fsExtra.emptyDirSync(
      path.join(
        userHomeDir,
        system_settings.find((i) => i.setting_type === 'EMAIL_DIRECTORY')
          .setting_value,
        system_settings
          .find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
          .setting_value.replace('-', 'to')
          .split('/')
          .join('-')
      )
    )
  } catch {
    returnError(res, 'Empty Dir Error')
    return
  }

  const missingResume = []
  for (const student of students) {
    const companyRecipient = new msg.Recipient()
    companyRecipient.addressType = 'SMTP'
    companyRecipient.displayType = msg.DisplayType.MAIL_USER
    companyRecipient.objectType = msg.ObjectType.MAIL_USER
    companyRecipient.displayName = student.email
    companyRecipient.emailAddress = student.email
    companyRecipient.recipientType = msg.RecipientType.TO

    let message = new msg.Message()
    message.subject = 'Internship Response to Internship Request'
    message.body = `Dear ${student.company_contact},\n\n`
    message.body += `Kindly find attached our students resume for the ${
      system_settings
        .find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
        .setting_value.replace(' - ', '/')
        .split('/')[2]
    } semester Internship in response to your job description which you have submitted to us.\n\n`
    message.body += `We look forward to your favorable response and to working with your company for the upcoming internship period ${
      system_settings.find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
        .setting_value
    }.`
    message.displayTo = student.company_contact
    message.recipients.push(companyRecipient)
    message.messageFlags.push(msg.MessageFlag.UNSENT)
    message.storeSupportMasks.push(msg.StoreSupportMask.CREATE)

    try {
      const buffer = fs.readFileSync(
        path.join(
          userHomeDir,
          system_settings.find((i) => i.setting_type === 'RESUME_DIRECTORY')
            .setting_value,
          system_settings
            .find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
            .setting_value.replace('-', 'to')
            .split('/')
            .join('-'),
          `${student.name}.pdf`
        )
      )

      const attachment = new msg.Attachment(buffer)
      attachment.fileName = `${student.name}.pdf`
      attachment.displayName = `${student.name}.pdf`
      message.attachments.push(attachment)
    } catch (e) {
      missingResume.push(`${student.name}${system_settings
        .find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
        .setting_value.replace('-', 'to')
        .split('/')
        .join('-')}`)
      console.log(`Resume for ${student.name} not found`)
    }

    fs.writeFileSync(
      path.join(
        userHomeDir,
        system_settings.find((i) => i.setting_type === 'EMAIL_DIRECTORY')
          .setting_value,
        system_settings
          .find((i) => i.setting_type === 'INTERNSHIP_PERIOD')
          .setting_value.replace('-', 'to')
          .split('/')
          .join('-'),
        `${student.name}.msg`
      ),
      message.toBytes()
    )
  }

  returnSuccess(res, { missingResume: missingResume })
})

// upload student file to directory
const POSTUPLOAD = router.post('/upload', async (req, res) => {
  console.log('/student (POST) Upload')
  const filename = req.files.student.name
  const file = req.files.student

  const system_settings = (
    await con.promise().query(`SELECT * FROM system_settings`)
  )[0]
  let internshipPeriod = system_settings.find(
    (i) => i.setting_type === 'INTERNSHIP_PERIOD'
  ).setting_value

  const uploadPath = path.join(
    userHomeDir,
    'backup/internshipData/students',
    internshipPeriod.replace('-', 'to').split('/').join('-')
  )

  /* istanbul ignore next */
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }
  file.mv(path.join(uploadPath, filename), (err) => {
    if (err) {
      /* istanbul ignore next */
      returnError(res, 'Error Path')
    } else {
      const workbook = new Excel.Workbook()
      workbook.xlsx.readFile(path.join(uploadPath, filename)).then(() => {
        let theData = []
        let headers = {}
        workbook.eachSheet((ws, sheetId) => {
          /* istanbul ignore next */ for (
            let i = 1;
            i <= ws.actualColumnCount;
            i++
          ) {
            headers[i] = ws.getRow(1).getCell(i).value
          }

          /* istanbul ignore next */ for (
            let x = 2;
            x <= ws.actualRowCount;
            x++
          ) {
            let theRow = {}

            for (let y = 1; y <= ws.actualColumnCount; y++) {
              theRow[headers[y]] = ws.getRow(x).getCell(y).value
            }
            theData.push(theRow)
          }
        })
        if (
          headers[1] === undefined ||
          headers[2] === undefined ||
          headers[3] === undefined ||
          headers[4] === undefined
        )
          return returnError(res, 'Missing Headers')

        con.query(` DELETE FROM student `)

        try {
          theData.forEach((row) => {
            con.query(
              `     
                                INSERT INTO student(student_id, name, preference, status, company_id) VALUES (?, ? , ? , ? , null);`,
              [
                row['Student ID'],
                row['Name'],
                row['Preference'],
                row['Status'].toUpperCase()
              ]
            )
          })
        } catch (e) {
          console.log(e)
          return returnError(res)
        }

        return returnSuccess(res, 'Successfully updated & uploaded files')
      })
    }
  })
})

module.exports = { POST, POSTUPLOAD }
