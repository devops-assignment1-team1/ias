const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);
const fs = require('fs');
const path = require('path');

describe('test companies API', () => {
    test('Post /compaines', async() => {
        const file = fs.createReadStream(path.join(__dirname ,'../../..', "TestData/gaf.csv"));
        request
          .post("http://localhost:5222/api/v1/companies/upload")
          .attach("company", file)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.message).toBe("File uploaded successfully");
            done();
          });
    })
});