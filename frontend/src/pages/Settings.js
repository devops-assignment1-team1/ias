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
            </div>
            <hr />
        </div>
    )
}

export default Settings