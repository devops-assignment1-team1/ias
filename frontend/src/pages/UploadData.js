import React, { useState, useEffect } from 'react';

// Import components
import toast from 'react-hot-toast';
import { Title } from '../components/Title/Title';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { BiFolderOpen } from "react-icons/bi";

function UploadData() {
  // States
  const [showStudentFile, setShowStudentFile] = useState(false); // input modal show
  const [showCompanyFile, setShowCompanyFile] = useState(false); // input modal show

  // Init form data to store files
  const [studentFormData, setStudentFormData] = useState(new FormData());
  const [companyFormData, setCompanyFormData] = useState(new FormData());

  // file change when user selects file
  const handleStudentFileChange = (event, key) => {
    studentFormData.append(key, event);
    setStudentFormData(studentFormData);
    setStudentFileName(event.name);
    //handleStudentSave();
    handleCloseStudentFile();
  };

  const handleCompanyFileChange = (event, key) => {
    companyFormData.append(key, event);
    setCompanyFormData(companyFormData);
    setCompanyFileName(event.name);
    //handleCompanySave();
    handleCloseCompanyFile();
  };

  const [studentFileName, setStudentFileName] = useState("File Directory");
  const [companyFileName, setCompanyFileName] = useState("File Directory");

  // file inputs
  const studentFileInput = React.createRef();
  const companyFileInput = React.createRef();

  const [data, setData] = useState(null);
  const [internshipPeriod, setInternshipPeriod] = useState(null);

  const handleConfirmStudentFile = (event) => {
    var input = document.getElementById("StudentUploadFile");
    console.log(input.files[0]);
    handleStudentFileChange(input.files[0], "student-file");
  };

  const handleConfirmCompanyFile = (event) => {
    var input = document.getElementById("CompanyUploadFile");
    console.log(input.files[0]);
    handleCompanyFileChange(input.files[0], "company-file");
  };

    // Student file show/hide handler +
  // Student file text update
  const handleStudentClick = () => {
    setShowStudentFile(true);
    setStudentFileName("");
    setStudentFormData(new FormData());
  };

  const handleCloseStudentFile = () => {
    setShowStudentFile(false);
  };

  // Company file show/hide handler +
  // Company file text update
  const handleCompanyClick = () => {
    setShowCompanyFile(true);
    setCompanyFileName("");
    setCompanyFormData(new FormData());
  };
  const handleCloseCompanyFile = () => {
    setShowCompanyFile(false);
  };


  return (
    <div
      style={{ paddingTop: "80px", paddingLeft: "50px", textAlign: "initial" }}
      className="container-fluid m-0"
    >
      <div className="row">
        {/* Title */}
        <div className="col">
          <Title>Upload Data</Title>
          <p>
            Upload the corresponding excel files for the current semester here.
          </p>
        </div>
        {/* Student's Data */}
        <h2
          id="student-file-header"
          style={{
            paddingTop: "20px",
            fontFamily: "var(--secondary-font)",
            fontSize: "20px",
          }}
        >
          Student's Data
        </h2>
        <hr />
        <div className="container-fluid m-0">
          <div className="row">
            {/* Text */}
            <Card body className="col-9" style={{ fontSize: "20px" }}>
              <BiFolderOpen /> {studentFileName}
            </Card>

            {/* Button to Upload */}
            <div className="col-2 justify-content-center align-self-center">
              <Button
                variant="dark"
                style={{ padding: "15px", width: "-webkit-fill-available" }}
                onClick={handleStudentClick}
              >
                UPLOAD FILE
              </Button>
            </div>
          </div>
        </div>

        {/* Company's Data */}
        <h2
          id="company-file-header"
          style={{
            paddingTop: "20px",
            fontFamily: "var(--secondary-font)",
            fontSize: "20px",
          }}
        >
          Company's Data
        </h2>
        <hr />
        <div className="container-fluid m-0" style={{ paddingBottom: "100px" }}>
          <div className="row">
            {/* Text */}
            <Card body className="col-9" style={{ fontSize: "20px" }}>
              <BiFolderOpen /> {companyFileName}
            </Card>

            {/* Button to Upload */}
            <div className="col-2 justify-content-center align-self-center">
              <Button
                variant="dark"
                style={{ padding: "15px", width: "-webkit-fill-available" }}
                onClick={handleCompanyClick}
              >
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
              id="StudentUploadFile"
              formEncType='multipart/form-data'
              type="file"
              name="student-file"
              defaultValue={studentFileName}
              ref={studentFileInput}
            />
          </Modal.Body>

          {/* Confirm selection button */}
          <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmStudentFile}>
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
              id="CompanyUploadFile"
              formEncType='multipart/form-data'
              type="file"
              name="company-file"
              defaultValue={companyFileName}
              ref={companyFileInput}
            />
          </Modal.Body>

          {/* Confirm selection button */}
          <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmCompanyFile}>
              CONFIRM
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UploadData