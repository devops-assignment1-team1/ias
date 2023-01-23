const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);

describe('company test suite', () => {
    test('tests get /companies endpoint', async() => {
        const response = await request.get("/api/v1/companies");
        expect(response.statusCode).toBe(200);
        expect(response.body.length >= 0).toBeTruthy();
    });
});