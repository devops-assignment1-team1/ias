import React, { useState, useEffect } from 'react'

// Import components
import toast from 'react-hot-toast'
import { Title } from '../components/Title/Title'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function PrepareEmail() {
  const [title, setTitle] = useState("Prepare Emails")
  const [studentData, setStudentData] = useState([]); // student data
  const [companiesData, setCompaniesData] = useState([]); // company data

  useEffect(() => {
    // get students
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://localhost:5222/api/v1/students?status=PENDING_CONFIRMATION", requestOptions) // TODO :: update this
        .then(response => response.json())
        .then(result => {
          setStudentData(result);
        })
        .catch(error => toast.error("Error getting data"));
        
    // get companies
    fetch("http://localhost:5222/api/v1/companies", requestOptions)
    .then(response => response.json())
    .then(result => {
      setCompaniesData(result);
    })
    .catch(error => toast.error("Error getting data"));
  }, [])

  // send email, toast
  function handlePrepareEmail(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://localhost:5222/api/v1/students/generateEmail", requestOptions)
        .then(async(result) => {
          result = await result.json()
          setTitle("Prepare Emails - Email Prepared");
          // console.log(result.body)
          if (result.missingResume.length === 0){
            toast.success("Email prepared successfully");
          }else{
            toast.success(`Email prepared. Missing resume(s) from ${result.missingResume.join(", ")}`);
          }
        })
        .catch(error => {
          toast.error("Error preparing email");
          console.log(error);
      });
  }


  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial", minHeight:"95vh"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col-9">
                <Title>{title}</Title>
                <p>Manage emails to companies for students here. Select student to prepare their email.</p>
            </div>

            {/* Prepare Email */}
            <div className="col-3 justify-content-center align-self-center" style={{textAlign:"end", paddingRight:"50px" }}>
                <Button id="email-btn" variant="dark" style={{padding:"15px 30px"}} onClick={handlePrepareEmail}>PREPARE EMAIL</Button>
            </div>
        </div>
        <hr />

        <Table striped bordered hover id="email-table">
          {/* Table Title */}
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Preference</th>
              <th>Company</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {studentData.map((sdata) => {
              return (<tr key={sdata.student_id}>
                <td>{sdata.student_id}</td>
                <td>{sdata.name}</td>
                <td>{sdata.preference}</td>
                <td>
                  {companiesData.map(company => {
                    var companyName = "";
                    if(company.company_id === sdata.company_id){
                      companyName = company.company_name;
                    }
                    return companyName;
                  })}
                </td>
              </tr>)
            })}
          </tbody>
      </Table>
    </div>
  )
}

export default PrepareEmail