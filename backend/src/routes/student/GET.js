const con = require("../../db");
const utils = require("../../utils");
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const e = require("express");
const router = express.Router();

const GET = router.get('/', (req, res) => {
    const { status } = req.query;

    con.connect(error => {
        /* istanbul ignore next */
        if (error) return returnError(res, "Database Error");

        if (status) {
            con.query('SELECT * FROM student WHERE status = ?', [status], (error, results) => {
                /* istanbul ignore next */
                if (error) return returnError(res, "Database Error");
                returnSuccess(res, results);
            });
        } else {
            con.query('SELECT * FROM student', (error, results) => {
                /* istanbul ignore next */
                if (error) return returnError(res, "Database Error");
                returnSuccess(res, results);
            });
        }

    });
});

module.exports = GET;
