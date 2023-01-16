import React from 'react'

// Import components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { 
  BiUpload,
  BiGroup,
  BiMailSend,
  BiCog
} from "react-icons/bi";

// Import style
import "./NavBar.css"

function NavBar() {
  return (
    <div>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container style={{padding:0,paddingLeft:"50px"}} fluid>
                <Navbar.Brand data-testid="main-link" to="/Main" href="/Main" style={{fontSize:"30px"}}>IAS</Navbar.Brand>
                    <Nav data-testid="navbar" className="justify-content-end" style={{padding:0,paddingRight:"50px"}}>
                        <Nav.Link data-testid="upload-data-link" to="/Upload_Data" href="/Upload_Data"> <BiUpload/> UPLOAD</Nav.Link>
                        <Nav.Link data-testid="match-students-link" to="/Match_Student" href="/Match_Student"><BiGroup/> MATCH STUDENTS</Nav.Link>
                        <Nav.Link data-testid="prepare-emails-link" to="/Prepare_Email" href="/Prepare_Email"><BiMailSend/> PREPARE EMAILS</Nav.Link>
                        <Nav.Link data-testid="settings-link" to="/Settings" href="/Settings"><BiCog/> SETTINGS</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar