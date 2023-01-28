const supertest = require('supertest');
const app = require("./server.js");
const request = supertest(app);

describe('settings test suite', () => {
    test('tests get /settings endpoints', async() => {
        const response = await request.get("/api/v1/settings");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(3);
    });
    
    test('tests post /settings endpoints', async() => {
        const payload = {email_dir: 'qwerty', resume_dir: 'qwerty', internship_period: '12345' };
        const res = await request
                    .post('/api/v1/settings')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')

        expect(res.statusCode).toBe(200);
    });
});