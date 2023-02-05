import React, { useState } from 'react'
import PORT from '../conn'

// Import components
import { Title } from '../components/Title/Title'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { BiFolderOpen } from 'react-icons/bi'
import axios from 'axios'
import toast from 'react-hot-toast'

// Import style
// import "../components/Settings/Settings.css"

function UploadData() {
  // States
  const [showStudentFile, setShowStudentFile] = useState(false) // input modal show
  const [showCompanyFile, setShowCompanyFile] = useState(false) // input modal show

  // Lincoln file file
  const [studentFile, setStudentFile] = useState(null)
  const [companyFile, setCompanyFile] = useState(null)

  //lincoln upload function
  const uploadStudentFile = (e) => {
    e.preventDefault()
    let studentformData = new FormData()
    studentformData.append('student', studentFile)
    setStudentFileName(studentFile.name)
    axios
      .post(PORT + '/api/v1/students/upload', studentformData)
      .then(() => {
        toast.success('Upload successful')
      })
      .catch(() => {
        toast.error('Database error, please check correct file format.')
      })
    handleCloseStudentFile()
  }

  const uploadCompanyFile = (e) => {
    e.preventDefault()
    let companyformData = new FormData()
    companyformData.append('company', companyFile)
    setCompanyFileName(companyFile.name)
    axios
      .post(PORT + '/api/v1/companies/upload', companyformData)
      .then(() => {
        toast.success('Upload successful')
      })
      .catch(() => {
        toast.error('Database error, please check correct file format.')
      })
    handleCloseCompanyFile()
  }

  const [studentFileName, setStudentFileName] = useState('')
  const [companyFileName, setCompanyFileName] = useState('')
  const [internshipPeriod, setInternshipPeriod] = useState(null)

  // get internship period to display
  React.useEffect(() => {
    fetch(PORT + '/api/v1/settings')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data && data.length > 0) {
          const internshipPeriod = data.filter(
            (setting) => setting.setting_type === 'INTERNSHIP_PERIOD'
          )[0].setting_value
          setInternshipPeriod(internshipPeriod)
        }
      })
  }, [])

  // Student file show/hide handler +
  // Student file text update
  const handleStudentClick = () => {
    setShowStudentFile(true)
    setStudentFileName('')
  }

  const handleCloseStudentFile = () => {
    setShowStudentFile(false)
  }

  // Company file show/hide handler +
  // Company file text update
  const handleCompanyClick = () => {
    setShowCompanyFile(true)
    setCompanyFileName('')
  }

  const handleCloseCompanyFile = () => {
    setShowCompanyFile(false)
  }

  return (
    <div
      style={{ paddingTop: '80px', paddingLeft: '50px', textAlign: 'initial' }}
      className="container-fluid m-0">
      <div className="row">
        {/* Title */}
        <div className="col">
          <Title>Upload Data</Title>
          <p>
            Upload the corresponding excel files for the current semester here.
          </p>
          <div className="row">
            <p>Internship Period: </p>
            {internshipPeriod ? (
              <b>{internshipPeriod}</b>
            ) : (
              <b>Not specified</b>
            )}
          </div>
        </div>
      </div>
      <hr />

      {/* Student's Data */}
      <h2
        id="student-file-header"
        style={{
          paddingTop: '20px',
          fontFamily: 'var(--secondary-font)',
          fontSize: '20px'
        }}>
        Student's Data
      </h2>
      <hr />
      <div className="container-fluid m-0">
        <div className="row">
          {/* Text */}
          <Card
            body
            className="col-9"
            style={{ fontSize: '20px' }}
            data-testid="value-student">
            <BiFolderOpen /> {studentFileName}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button
              id="student-upload"
              variant="dark"
              style={{ padding: '15px', width: '-webkit-fill-available' }}
              onClick={handleStudentClick}>
              UPLOAD FILE
            </Button>
          </div>
        </div>
      </div>

      {/* Company's Data */}
      <h2
        id="company-file-header"
        style={{
          paddingTop: '20px',
          fontFamily: 'var(--secondary-font)',
          fontSize: '20px'
        }}>
        Company's Data
      </h2>
      <hr />
      <div className="container-fluid m-0" style={{ paddingBottom: '100px' }}>
        <div className="row">
          {/* Text */}
          <Card
            body
            className="col-9"
            style={{ fontSize: '20px' }}
            data-testid="value-company">
            <BiFolderOpen /> {companyFileName}
          </Card>

          {/* Button to Upload */}
          <div className="col-2 justify-content-center align-self-center">
            <Button
              id="company-upload"
              variant="dark"
              style={{ padding: '15px', width: '-webkit-fill-available' }}
              onClick={handleCompanyClick}>
              UPLOAD FILE
            </Button>
          </div>
        </div>
      </div>

      {/* Student directory modal */}
      <Modal show={showStudentFile} onHide={handleCloseStudentFile}>
        {/* Header with close button */}
        <Modal.Header closeButton>
          <Modal.Title>Choose file to upload</Modal.Title>
        </Modal.Header>

        {/* Body with input */}
        <Modal.Body>
          <input
            data-testid="student-input"
            id="student-upload-file"
            formEncType="multipart/form-data; boundary=----WebKitFormBoundaryGVn59QTi5BpftPIp"
            type="file"
            name="student"
            defaultValue={studentFileName}
            onChange={(e) => {
              setStudentFile(e.target.files[0])
            }}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button
            id="student-confirm"
            variant="primary"
            onClick={(e) => uploadStudentFile(e)}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Company directory modal */}
      <Modal show={showCompanyFile} onHide={handleCloseCompanyFile}>
        {/* Header with close button */}
        <Modal.Header closeButton>
          <Modal.Title>Choose file to upload</Modal.Title>
        </Modal.Header>

        {/* Body with input */}
        <Modal.Body>
          <input
            data-testid="company-input"
            id="company-upload-file"
            formEncType="multipart/form-data"
            type="file"
            name="company"
            defaultValue={companyFileName}
            onChange={(e) => {
              setCompanyFile(e.target.files[0])
            }}
          />
        </Modal.Body>

        {/* Confirm selection button */}
        <Modal.Footer>
          <Button
            id="company-confirm"
            variant="primary"
            onClick={(e) => uploadCompanyFile(e)}>
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UploadData
