import React from 'react'

// Import components
import { Title } from '../components/Title/Title'
import "../components/Main/Main.css"

function Main() {
  return (
    <div style={{paddingTop:"180px",textAlign:"initial"}} className="container-fluid m-0 bg">
    <div className="row content" style={{paddingLeft:"50px", paddingBottom:"80px"}}>
      {/* Title */}
      <div className="col">
          <Title>Easy Student Internship <br/> Management</Title>
          <p>One-stop application to manage all internship matters.</p>
      </div>
    </div>
  </div>
  )
}

export default Main