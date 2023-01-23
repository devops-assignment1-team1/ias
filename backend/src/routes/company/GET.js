const con = require("../../db");
const utils = require("../../utils");
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const e = require("express");
const router = express.Router();

const GET = router.get('/', (req, res) => {
    con.connect(error => {
        /* istanbul ignore next */
        if (error) return returnError(res, "Database Error");
        con.query('SELECT * FROM company', (error, results) => {
            /* istanbul ignore next */
            if (error) return returnError(res, "Database Error");
            returnSuccess(res, results);
        });
    });
});

module.exports = GET;