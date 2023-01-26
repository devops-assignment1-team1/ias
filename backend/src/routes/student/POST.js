const con = require("../../db");
const utils = require("../../utils");
const path = require("path");
const msg = require("./msg")
const returnSuccess = utils.returnSuccess;
const returnError = utils.returnError;
const express = require("express");
const router = express.Router();
const fs = require("fs");
const fsExtra = require('fs-extra');
const os = require("os");
const userHomeDir = os.homedir();

const POST = router.post('/generateEmail', async (req, res) => {
    console.log("/generateEmail (POST)");

    const system_settings = (await con.promise().query(
        `SELECT * FROM system_settings`
    ))[0];

    const students = (await con.promise().query(
        `
        SELECT * FROM student
        INNER JOIN
        company on student.company_id = company.company_id
        WHERE
        student.status = 'PENDING_CONFIRMATION';
        `
    ))[0];


    try {
        fsExtra.emptyDirSync(
            path.join(
                userHomeDir,
                system_settings.find(i => i.setting_type === "EMAIL_DIRECTORY").setting_value, 
                system_settings.find(i => i.setting_type === "INTERNSHIP_PERIOD").setting_value.replace("-","to").split("/").join("-")
                )
            );
    } catch {
        returnError(res, "Empty Dir Error");
        return;
    }

    let success = true;
    const missingResume = [];
    for (const student of students) {
        const companyRecipient = new msg.Recipient();
        companyRecipient.addressType = "SMTP";
        companyRecipient.displayType = msg.DisplayType.MAIL_USER;
        companyRecipient.objectType = msg.ObjectType.MAIL_USER;
        companyRecipient.displayName = student.email;
        companyRecipient.emailAddress = student.email;
        companyRecipient.recipientType = msg.RecipientType.TO;

        let message = new msg.Message();
        message.subject = "Internship Response to Internship Request";
        message.body = `Dear ${student.company_contact},\n\n`;
        message.body += `Kindly find attached our students resume for the ${system_settings.find(i => i.setting_type === "INTERNSHIP_PERIOD").setting_value.replace(" - ", "/").split("/")[2]} semester Internship in response to your job description which you have submitted to us.\n\n`;
        message.body += `We look forward to your favorable response and to working with your company for the upcoming internship period ${system_settings.find(i => i.setting_type === "INTERNSHIP_PERIOD").setting_value}.`;
        message.displayTo = student.company_contact;
        message.recipients.push(companyRecipient);
        message.messageFlags.push(msg.MessageFlag.UNSENT);
        message.storeSupportMasks.push(msg.StoreSupportMask.CREATE);

        try{
            const buffer = fs.readFileSync(
                path.join(
                    userHomeDir,
                    system_settings.find(i => i.setting_type === "RESUME_DIRECTORY").setting_value, 
                    system_settings.find(i => i.setting_type === "INTERNSHIP_PERIOD").setting_value.replace("-","to").split("/").join("-"), 
                `${student.name}.pdf`));

            const attachment = new msg.Attachment(buffer);
            attachment.fileName = `${student.name}.pdf`;
            attachment.displayName = `${student.name}.pdf`;
            message.attachments.push(attachment);
        }catch(e){
            missingResume.push(student.name)
            console.log(`Resume for ${student.name} not found`);
            success = false;
        }
        
        fs.writeFileSync(
            path.join(
                userHomeDir,
                system_settings.find(i => i.setting_type === "EMAIL_DIRECTORY").setting_value, 
                system_settings.find(i => i.setting_type === "INTERNSHIP_PERIOD").setting_value.replace("-","to").split("/").join("-"), 
                `${student.name}.msg`
                ), message.toBytes());
    }

    returnSuccess(res, {missingResume: missingResume});
});

module.exports = POST;