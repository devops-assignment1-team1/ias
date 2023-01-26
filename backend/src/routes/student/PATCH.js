const con = require("../../db");
const utils = require("../../utils");
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const router = express.Router();

const PATCH = router.patch('/', (req, res) => {
    console.log("/students (PATCH)");
    con.connect(error => {
        /* istanbul ignore next */
        if (error) return returnError(res, "Database Error");

        const body = req.body;
        if (body.students === undefined) return returnError(res, "Missing students");

        var query = '';
        body.students.forEach(student => {
            query += `UPDATE student SET company_id = ${student.company_id}, status = '${student.status}' WHERE student_id = '${student.student_id}';`;
        });
        con.query(
            query,
            function (error, results, fields) {
                if (error) return returnError(res, "Database Error");
                returnSuccess(res, { "result": "success" });
            }
        );
    });
});

module.exports = PATCH;
