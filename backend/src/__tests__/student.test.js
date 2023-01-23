const supertest = require('supertest');
const app = require("../server.js");

describe('student test suite', () => {

    test('tests get /students endpoint', async () => {
        const response = await supertest(app).get("/api/v1/students");
        expect(response.statusCode).toBe(200);
        expect(response.body.length >= 0).toBeTruthy();
    });

    test('tests get /students filter status (UNASSIGNED) endpoint', async () => {
        const response = await supertest(app).get("/api/v1/students?status=UNASSIGNED");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "UNASSIGNED") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });

    test('tests get /students filter status (PENDING_CONFIRMATION) endpoint', async () => {
        const response = await supertest(app).get("/api/v1/students?status=PENDING_CONFIRMATION");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "PENDING_CONFIRMATION") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });

    test('tests get /students filter status (CONFIRMED) endpoint', async () => {
        const response = await supertest(app).get("/api/v1/students?status=CONFIRMED");
        expect(response.statusCode).toBe(200);

        const statuses = [];
        response.body.forEach(student => {
            if (student.status === "CONFIRMED") return;
            statuses.push(student.status);
        });

        expect(statuses.length === 0).toBeTruthy();
    });

});