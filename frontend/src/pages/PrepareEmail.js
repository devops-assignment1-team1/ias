import React, { useState, useEffect } from 'react'

// Import components
import toast from 'react-hot-toast'
import { Title } from '../components/Title/Title'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function prepareEmail() {
  const [title, setTitle] = useState("Prepare Emails")

  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col-9">
                <Title>{title}</Title>
                <p>Manage emails to companies for students here. Select student to prepare their email.</p>
            </div>

            {/* Prepare Email */}
            <div className="col-3 justify-content-center align-self-center" style={{textAlign:"end", paddingRight:"50px" }}>
                <Button id="email-btn" variant="dark" style={{padding:"15px 30px"}}>PREPARE EMAIL</Button>
            </div>
        </div>
        <hr />
    </div>
  )
}

export default prepareEmail