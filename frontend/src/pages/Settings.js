import React, { useState, useEffect } from 'react';
import PORT from "../conn";

// Import components
import toast from 'react-hot-toast';
import { Calendar } from "react-multi-date-picker";
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { 
    BiFolderOpen ,
    BiCalendar
} from "react-icons/bi";

// Import style
import "../components/Settings/Settings.css"

function Settings() {
    // Init states for texts
    const [internshipPeriod , setInternshipPeriod] = useState("DD/MM/YYYY - DD/MM/YYYY");
    const [emailPath, setEmailPath] = useState("File Directory");
    const [resumePath, setResumePath] = useState("File Directory");

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
            <div className="container-fluid m-0" >
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}}>
                        <BiFolderOpen/> {emailPath}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}} >UPDATE DIRECTORY</Button>
                    </div>
                </div>
            </div>

            {/* Resume directory */}
            <h2 id="resume-dir-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Resume Directory</h2>
            <hr />
            <div className="container-fluid m-0">
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}}>
                        <BiFolderOpen/> {resumePath}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}} >UPDATE DIRECTORY</Button>
                    </div>
                </div>
            </div>

            {/* Internship period */}
            <h2 id="internship-header" style={{paddingTop:"20px" ,fontFamily: "var(--secondary-font)", fontSize: "20px"}}>Internship Period</h2>
            <hr />
            <div className="container-fluid m-0" style={{paddingBottom:"100px"}}>
                <div className="row">
                    {/* Text */}
                    <Card body className="col-9" style={{fontSize:"20px"}} id="internship-period-text">
                        <BiCalendar/> {internshipPeriod}
                    </Card>
                    
                    {/* Button to Upload */}
                    <div className="col-2 justify-content-center align-self-center">
                        <Button variant="dark" style={{padding:"15px", width:"-webkit-fill-available"}}>UPDATE PERIOD</Button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Settings