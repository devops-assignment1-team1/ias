const supertest = require('supertest');
const app = require("./server.js");
const request = supertest(app);
const fs = require('fs');
const path = require('path');
const os = require("os");
const Excel = require('exceljs');

describe('student test suite', () => {
    test('test post /students/upload', async() => {
      const payload = { email_dir: 'eexports/email', resume_dir: 'eexports/resume', internship_period: '02/12/2024 - 10/12/2024' };
      response = await request
          .post('/api/v1/settings')
          .send(payload)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);

      response = await request
        .post("/api/v1/students/upload")
        .attach("student",`${__dirname}/mock/StudentData.xlsx`)

      const userHomeDir = os.homedir();
      const workbook = new Excel.Workbook();
      
      expect(fs.existsSync(path.join(userHomeDir, 'backup/internshipData/students', '02-12-2024 to 10-12-2024','StudentData.xlsx'))).toBe(true);

      await workbook.xlsx.readFile(path.join(userHomeDir, 'backup/internshipData/students', '02-12-2024 to 10-12-2024','StudentData.xlsx')).then(async()=>{
        response = await request
        .get("/api/v1/students")
        expect(response.body.length).toBe(4)
      });
    });

    test('test post /students/upload missing status', async() => {
      const payload = { email_dir: 'eexports/email', resume_dir: 'eexports/resume', internship_period: '02/12/2024 - 10/12/2024' };
      response = await request
          .post('/api/v1/settings')
          .send(payload)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);

      response = await request
        .post("/api/v1/students/upload")
        .attach("student",`${__dirname}/mock/StudentData - Missing Status.xlsx`)
      
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe("Missing Headers");

      const userHomeDir = os.homedir();
      const workbook = new Excel.Workbook();
      
      expect(fs.existsSync(path.join(userHomeDir, 'backup/internshipData/students', '02-12-2024 to 10-12-2024','StudentData - Missing Status.xlsx'))).toBe(true);

      await workbook.xlsx.readFile(path.join(userHomeDir, 'backup/internshipData/students', '02-12-2024 to 10-12-2024','StudentData - Missing Status.xlsx')).then(async()=>{
        response = await request
        .get("/api/v1/students")
        expect(response.body.length).toBe(4) //supposed to be 8 but since fail, then not updated, so stay as 4
      });
    });
});