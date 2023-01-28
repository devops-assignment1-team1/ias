const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);
const fs = require('fs');
const path = require('path');
const os = require("os");
const Excel = require('exceljs');

describe('company test suite', () => {
    test('test post /company/upload', async() => {
      const payload = { email_dir: 'eexports/email', resume_dir: 'eexports/resume', internship_period: '02/12/2024 - 10/12/2024' };
      response = await request
          .post('/api/v1/settings')
          .send(payload)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);

      response = await request
        .post("/api/v1/companies/upload")
        .attach("company",`${__dirname}/mock/CompanyData.xlsx`)

      const userHomeDir = os.homedir();
      const workbook = new Excel.Workbook();
      
      expect(fs.existsSync(path.join(userHomeDir, 'backup/internshipData/companies', '02-12-2024 to 10-12-2024','CompanyData.xlsx'))).toBe(true);

      await workbook.xlsx.readFile(path.join(userHomeDir, 'backup/internshipData/companies', '02-12-2024 to 10-12-2024','CompanyData.xlsx')).then(async()=>{
        response = await request
        .get("/api/v1/companies")
        expect(response.body.length).toBe(3)
      });
    });

    test('test post /company/upload missing status', async() => {
      const payload = { email_dir: 'eexports/email', resume_dir: 'eexports/resume', internship_period: '02/12/2024 - 10/12/2024' };
      response = await request
          .post('/api/v1/settings')
          .send(payload)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);

      response = await request
        .post("/api/v1/companies/upload")
        .attach("company",`${__dirname}/mock/CompanyData - Missing Contact.xlsx`)
      
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe("Missing Headers");

      const userHomeDir = os.homedir();
      const workbook = new Excel.Workbook();
      
      expect(fs.existsSync(path.join(userHomeDir, 'backup/internshipData/companies', '02-12-2024 to 10-12-2024','CompanyData - Missing Contact.xlsx'))).toBe(true);

      await workbook.xlsx.readFile(path.join(userHomeDir, 'backup/internshipData/companies', '02-12-2024 to 10-12-2024','CompanyData - Missing Contact.xlsx')).then(async()=>{
        response = await request
        .get("/api/v1/companies")
        expect(response.body.length).toBe(3) //supposed to be 6 but since fail, then not updated, so stay as 3
      });
    });
});