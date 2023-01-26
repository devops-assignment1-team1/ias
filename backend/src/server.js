const cors = require('cors');
const express = require("express");
const bp = require('body-parser');

const app = express();
app.use(bp.json());
app.use(cors());

app.get('/api/v1', (req, res) => {
    res.send('Hello World');
})

// router for settings
const settingsRouter = require('./routes/settings/GET');
app.use('/api/v1/settings', settingsRouter);

const upsertSettingsRouter = require('./routes/settings/POST');
app.use('/api/v1/settings', upsertSettingsRouter);

// router for students
const getStudentRouter = require('./routes/student/GET');
app.use('/api/v1/students', getStudentRouter);

const patchStudentRouter = require('./routes/student/PATCH');
app.use('/api/v1/students', patchStudentRouter);

const upsertStudentsRouter = require('./routes/student/POST');
app.use('/api/v1/students', upsertStudentsRouter);

// router for companies
const getCompanyRouter = require('./routes/company/GET');
app.use('/api/v1/companies', getCompanyRouter);

const upsertCompaniesRouter = require('./routes/company/POST');
app.use('/api/v1/companies', upsertCompaniesRouter);

module.exports =  app