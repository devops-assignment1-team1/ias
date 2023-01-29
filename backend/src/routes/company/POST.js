const con = require('../../db')
const utils = require('../../utils')
const returnSuccess = utils.returnSuccess
const returnError = utils.returnError
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const os = require('os')
const userHomeDir = os.homedir()
const axios = require('axios')
const Excel = require('exceljs')

// upload student file to directory
const POST = router.post('/upload', async (req, res) => {
  console.log('/company (POST) Upload')
  const filename = req.files.company.name
  const file = req.files.company

  const system_settings = (
    await con.promise().query(`SELECT * FROM system_settings`)
  )[0]
  let internshipPeriod = system_settings.find(
    (i) => i.setting_type === 'INTERNSHIP_PERIOD'
  ).setting_value
  const uploadPath = path.join(
    userHomeDir,
    'backup/internshipData/companies',
    internshipPeriod.replace('-', 'to').split('/').join('-')
  )

  /* istanbul ignore next */
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }
  file.mv(path.join(uploadPath, filename), (err) => {
    if (err) {
      /* istanbul ignore next */
      return res.send(err)
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

        con.query(
          ` UPDATE student SET company_id = NULL WHERE company_id IS NOT NULL`
        )

        con.query(` DELETE FROM company `)

        try {
          theData.forEach((row) => {
            con.query(
              `     
                                  INSERT INTO company(company_name, job_role, company_contact, email) VALUES (? , ? , ? , ?);`,
              [
                row['Company Name'],
                row['Job Role'],
                row['Company Contact'],
                row['Email'].text
              ]
            )
          })
        } catch (e) {
          console.log(e)
          return returnError(res)
        }

        return res.json({ message: 'Successfully updated & uploaded files' })
      })
    }
  })
})

module.exports = POST
