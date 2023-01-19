const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);
const FormData = require('form-data');
const fs = require('fs');

describe('test students API', () => {

    beforeEach(() => {
        // create a test file
        fs.writeFileSync('file.xlsx', 'file content');
    });

    afterEach(() => {
        // delete test file
        fs.unlinkSync('file.xlsx');
    })
    
    it('should send an excel file in post request to /api/v1/students/upload', async() => {
        // create form data object to sync to file
        const formData = new FormData();

        // read excel file
        const file = fs.readFileSync('file.xlsx');
        formData.append('file', file, 'file.xlsx');
        
        const res = await request
                    .post('/api/v1/students/upload')
                    .send(formData)
                    .expect('Content-Type', /json/)
        
        expect(res.body.message).toEqual('Success uploading file');
        expect(res.statusCode).toBe(200);
    });
});