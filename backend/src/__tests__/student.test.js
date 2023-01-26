const supertest = require('supertest');
const app = require("../server.js");
const request = supertest(app);

describe('student test suite', () => {

    test('tests get /students endpoint', async () => {
        const response = await request.get("/api/v1/students");
        expect(response.statusCode).toBe(200);
        expect(response.body.length >= 0).toBeTruthy();
    });

    test('tests get /students filter status (UNASSIGNED) endpoint', async () => {
        const response = await request.get("/api/v1/students?status=UNASSIGNED");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "UNASSIGNED") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });

    test('tests get /students filter status (PENDING_CONFIRMATION) endpoint', async () => {
        const response = await request.get("/api/v1/students?status=PENDING_CONFIRMATION");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "PENDING_CONFIRMATION") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });

    test('tests get /students filter status (CONFIRMED) endpoint', async () => {
        const response = await request.get("/api/v1/students?status=CONFIRMED");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "CONFIRMED") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });
    // constraint violated
    // Missing Students
    // Student array is empty
    test('tests patch /students endpoint', async () => {
        const payload = {
            "students": [
                {
                    "student_id": "S12345670A",
                    "status": "PENDING_CONFIRMATION",
                    "company_id": "1"
                },
                {
                    "student_id": "S12345671B",
                    "status": "PENDING_CONFIRMATION",
                    "company_id": "2"
                }
            ],
        };
        const response = await request
                    .patch('/api/v1/students')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    test('tests patch /students endpoint domain constraints violated', async () => { 
        const payload = {
            "students": [
                {
                    "student_id": "S12345670A",
                    "status": "ABCD",
                    "company_id": "1"
                }
            ],
        };
        const response = await request
                    .patch('/api/v1/students')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Database Error');
     })

     test('tests patch /students endpoint foreign key constraints violated', async () => { 
        const payload = {
            "students": [
                {
                    "student_id": "S12345670A",
                    "status": "PENDING_CONFIRMATION",
                    "company_id": "INVALID"
                }
            ],
        };
        const response = await request
                    .patch('/api/v1/students')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Database Error');
     })

    test('tests patch /students endpoint missing "students" in payload', async () => {
        const payload = {};
        const response = await request
                    .patch('/api/v1/students')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Missing students');
    });

    test('tests patch /students endpoint "students" array is length 0', async () => {
        const payload = {
            "students": [],
        };
        const response = await request
                    .patch('/api/v1/students')
                    .send(payload)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Database Error');
    });
});