const con = require("../../db");
const utils = require("../../utils");
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const router = express.Router();

const GET = router.get('/', (req, res) => {
    con.connect(error => {
        /* istanbul ignore next */
        if (error) throw error;

        con.query('SELECT * FROM system_settings', (error, results) => {
            /* istanbul ignore next */
            if (error) throw error;
            returnSuccess(res, results);
        })
    })
});

module.exports = GET;
