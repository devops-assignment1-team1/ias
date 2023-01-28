const con = require("../../db");
const utils = require("../../utils");
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');
const os = require("os");
const userHomeDir = os.homedir();
const axios = require("axios");
const Excel = require('exceljs');

const fileUpload = require("express-fileupload");
const cors = require("cors");
router.use(express.json())
router.use(cors())
router.use(fileUpload())

// get internship period
async function getInternshipPeriod() {
    const response = await axios.get("http://localhost:5222/api/v1/settings");
    const data = response.data
    const internship_period = data.find(setting => setting.setting_type === 'INTERNSHIP_PERIOD').setting_value;
    return internship_period
}

// get internship period for directory
let internshipPeriod;
getInternshipPeriod().then(period => {
    internshipPeriod = period
})

// upload student file to directory
const POST = router.post("/upload", (req, res)=>{
    const filename = req.files.company.name;
    const file = req.files.company
    const uploadPath = path.join(userHomeDir, 'backup/internshipData/companies', internshipPeriod.replace("-","to").split("/").join("-"))
    
    /* istanbul ignore next */
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    file.mv(path.join(uploadPath, filename),(err)=>{
        if(err){
            /* istanbul ignore next */
            return res.send(err);
        }
        else {
            const workbook = new Excel.Workbook();
            workbook.xlsx.readFile(path.join(uploadPath, filename)).then(()=>{
                let theData = [];
                let headers = {};
                workbook.eachSheet((ws,sheetId)=>{
                    
                    /* istanbul ignore next */for(let i=1;i<=ws.actualColumnCount; i++){
                        headers[i]=ws.getRow(1).getCell(i).value;
                    }

                    /* istanbul ignore next */for(let x=2;x<=ws.actualRowCount;x++){
                        let theRow = {};

                        for(let y=1;y<=ws.actualColumnCount;y++){
                            theRow[headers[y]] = ws.getRow(x).getCell(y).value
                        }
                        theData.push(theRow)
                    }
                })
                if (headers[1] || headers[2] || headers[3] || headers[4]  === undefined) return returnError(res, "Missing Headers");

                con.query(
                    ` DELETE FROM company `
                )

                theData.forEach(row => {
                    con.query(
                        `     
                              INSERT INTO company(company_name, job_role, company_contact, email) VALUES (? , ? , ? , ?);`,
                        [row["Company Name"], row["Job Role"] , row["Company Contact"] , row["Email"].text])
                });
                return res.json({ message: "Successfully updated & uploaded files" });
            })
        }
    })
})

module.exports = POST;
