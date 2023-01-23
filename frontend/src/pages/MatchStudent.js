import React, { useState, useEffect } from 'react'

// Import components
import toast from 'react-hot-toast';
import { Title } from '../components/Title/Title'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

function matchStudent() {
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
    fetch("http://localhost:5222/api/v1/students", requestOptions)
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

  return (
    <div style={{paddingTop:"80px",paddingLeft:"50px",textAlign:"initial"}} className="container-fluid m-0">
        <div className="row">
            {/* Title */}
            <div className="col">
                <Title>Match Students</Title>
                <p>Match students to companies and update their status here.</p>
            </div>
        </div>
        <hr />

        <Table striped bordered hover>
          {/* Table Title */}
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Preference</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {studentData.map((sdata) => {
              return (<tr key={sdata.student_id}>
                <td>{sdata.name}</td>
                <td>{sdata.preference}</td>
                <td>
                  <Form.Select defaultValue={sdata.company_id !== null && sdata.company_id} data-testid="company-dropdown" aria-label="Default select example">
                    <option value="" style={{color:"grey"}}>Select a company</option>
                    {companiesData.map((data)=>{
                      return(<option key={data.company_id} data-testid={data.company_id} value={data.company_id} >{data.company_name}</option>)
                    })}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select defaultValue={sdata.status} aria-label="Default select example" data-testid="status-dropdown">
                    <option value="UNASSIGNED">Unassigned</option>
                    <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
                    <option value="CONFIRMED">Confirmed</option>
                  </Form.Select>
                </td>
              </tr>)
            })}
          </tbody>
        </Table>
        
    </div>
  )
}

export default matchStudent