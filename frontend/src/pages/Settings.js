import React, { useState, useEffect } from 'react';
import PORT from "../conn";

// Import components
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
// Import style
import "../components/Settings/Settings.css"

function Settings() {
    return (
        <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
            <div className="row">
                {/* Title */}
                <div className="col">
                    <Title>Settings</Title>
                    <p>Make changes to file directories of emails and resumes.</p>
                </div>

                {/* Save Changes */}
                <div className="col justify-content-center align-self-center" style={{textAlign:"end", paddingRight:"50px" }}>
                    <Button id="save-btn" variant="dark" style={{padding:"15px 30px"}}>SAVE CHANGES</Button>
                </div>
            </div>
            <hr />

            {/* Email directory */}
            <h2 id="email-dir-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Email Directory</h2>
            <hr />

            {/* Resume directory */}
            <h2 id="resume-dir-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Resume Directory</h2>
            <hr />

            {/* Internship period */}
            <h2 id="internship-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Internship Period</h2>
            <hr />
        </div>
    )
}

export default Settings