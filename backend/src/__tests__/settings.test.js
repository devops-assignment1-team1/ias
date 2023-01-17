const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app)

describe('settings test suite', () => {
    test('tests get /settings endpoints', async() => {
        const response = await request.get("/api/v1/settings");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(3);
    });
});