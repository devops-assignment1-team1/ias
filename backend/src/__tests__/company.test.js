const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);

describe('company test suite', () => {
    test('tests get /companies endpoint', async() => {
        const response = await request.get("/api/v1/companies");
        expect(response.statusCode).toBe(200);
        expect(response.body.length >= 0).toBeTruthy();
    });
    test('tests post /compaines', async () => {
        const file = fs.createReadStream(path.join(__dirname, '../../..', "TestData/gaf.csv"));
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