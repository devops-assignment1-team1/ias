const con = require('../../db')
const utils = require('../../utils')
const returnSuccess = utils.returnSuccess
const returnError = utils.returnError
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const os = require('os')
const userHomeDir = os.homedir()

const POST = router.post('/', (req, res) => {
  console.log('/settings (POST)')
  con.connect((error) => {
    /* istanbul ignore next */
    if (error) throw error

    const body = req.body
    if (body.email_dir === undefined) return returnError(res, ['email_dir'])
    if (body.resume_dir === undefined) return returnError(res, ['resume_dir'])
    if (body.internship_period === undefined)
      return returnError(res, ['internship_period'])
    if (!body.internship_period.includes('/'))
      return returnError(res, ['missing /'])
    if (!body.internship_period.includes('-'))
      return returnError(res, ['missing -'])

    con.query(
      ` 
            UPDATE system_settings
            SET setting_value = CASE setting_type
                                    WHEN "RESUME_DIRECTORY" THEN ?
                                    WHEN "EMAIL_DIRECTORY" THEN ?
                                    WHEN "INTERNSHIP_PERIOD" THEN ?
                                END
            WHERE setting_type IN("RESUME_DIRECTORY", "EMAIL_DIRECTORY", "INTERNSHIP_PERIOD");
            `,
      [body.resume_dir, body.email_dir, body.internship_period],
      function (error, results, fields) {
        /* istanbul ignore next */
        if (error) returnError(res, 'Error')
        fs.mkdirSync(
          path.join(
            userHomeDir,
            body.email_dir,
            body.internship_period.replace('-', 'to').split('/').join('-')
          ),
          { recursive: true }
        )
        fs.mkdirSync(
          path.join(
            userHomeDir,
            body.resume_dir,
            body.internship_period.replace('-', 'to').split('/').join('-')
          ),
          { recursive: true }
        )
        returnSuccess(res, { result: 'success' })
      }
    )
  })
})

module.exports = POST
