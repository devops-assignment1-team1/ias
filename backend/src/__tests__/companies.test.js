const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);

describe('test companies API', () => {
    it('should send an excel file in post request to /api/v1/companies/upload', async() => {
        // create excel file
        const file = new File(['file content'], 'file.xlsx', { type: 'application/vnd.ms-excel' });
        
        const res = await request
                    .post('/api/v1/companies/upload')
                    .attach('file', file.path)
                    .expect(200)
                    .end((err, res) => {
                        if (err) throw error;
                    })
                    expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
                    expect(res.body).toEqual({ message: 'Success uploading file'})
    });
});