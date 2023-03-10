import { render, screen, fireEvent, waitFor, getAllByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import UploadData from '../../pages/UploadData'
import nock from 'nock'

describe('Render components', () => {
  beforeEach(() => {
    nock('http://localhost:5222')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .persist()
      .get('/api/v1/settings')
      .reply(200, [
        { setting_type: 'EMAIL_DIRECTORY', setting_value: 'qwerty' },
        {
          setting_type: 'INTERNSHIP_PERIOD',
          setting_value: '01/01/2023 - 03/01/2023'
        },
        { setting_type: 'RESUME_DIRECTORY', setting_value: 'qwerty' }
      ])
  })

  test('Load internship period', async () => {
    const screen = render(<UploadData />)

    await waitFor(() => {
      expect(
        screen.getAllByText('01/01/2023 - 03/01/2023')[0]
      ).toBeInTheDocument()
    })
  })

  test('Render title', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const title = screen.container.querySelector('#title')
    expect(title).toHaveTextContent('Upload Data')
    expect(title.nextElementSibling).toHaveTextContent(
      'Upload the corresponding excel files for the current semester here.'
    )
  })

  test('Render student data header', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const studentDataHeader = screen.container.querySelector(
      '#student-file-header'
    )
    expect(studentDataHeader).toHaveTextContent("Student's Data")
  })

  test('Render company data header', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const companyDataHeader = screen.container.querySelector(
      '#company-file-header'
    )
    expect(companyDataHeader).toHaveTextContent("Company's Data")
  })

  test('Render file directory fields', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const fileDirectoryFields = screen.container.querySelectorAll('.card-body')
    expect(fileDirectoryFields.length).toBe(2)
  })

  test('Render upload file buttons', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const uploadFileButtons = screen.getAllByText('UPLOAD FILE')
    expect(uploadFileButtons.length).toBe(2)
  })

  test('Render student file modal', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const studentFileUpdateButton =
      screen.container.querySelector('#student-upload')
    fireEvent.click(studentFileUpdateButton)
    const studentFileModal = screen.getByText('Choose file to upload')
    expect(studentFileModal).toBeVisible()
    const confirmButton = screen.getByRole('button', { name: 'CONFIRM' })
    expect(confirmButton).toBeVisible()
    const input = screen.getByTestId('student-input')
    expect(input).toBeVisible()
  })

  test('Render company file modal', async () => {
    // ARRANGE
    const screen = render(<UploadData />)

    // ASSERT
    const companyFileUpdateButton =
      screen.container.querySelector('#company-upload')
    fireEvent.click(companyFileUpdateButton)
    const companyFileModal = screen.getByText('Choose file to upload')
    expect(companyFileModal).toBeVisible()
    const confirmButton = screen.getByRole('button', { name: 'CONFIRM' })
    expect(confirmButton).toBeVisible()
    const input = screen.getByTestId('company-input')
    expect(input).toBeVisible()
  })

  test('Upload student', async () => {
    // ARRANGE
    nock('http://localhost:5222')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
        })
        .persist()
        .post('/api/v1/students/upload')
        .reply(200);

    const upload = render(<UploadData />)

    // ASSERT
    const studentFileUpdateButton = upload.container.querySelector('#student-upload')
      fireEvent.click(studentFileUpdateButton)
      const studentFileModal = upload.getByText('Choose file to upload')
      expect(studentFileModal).toBeVisible()
     
  
      const { getByTestId, getAllByTestId } = render(<UploadData />);
  
      const fileInput = getByTestId('student-input');
      const file = new File(['test file content'], 'test-student.xlsx', {
          type: 'text/plain',
      });
      fireEvent.change(fileInput, { target: { files: [file] } });
      const confirmButton = screen.getByRole('button', { name: 'CONFIRM' })
      fireEvent.click(confirmButton)
      await waitFor(()=>{
        expect(getAllByTestId("value-student")[0].firstChild.textContent).toBe(" test-student.xlsx")
      })
  })

  test('Upload company', async () => {
    // ARRANGE
    nock('http://localhost:5222')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
        })
        .persist()
        .post('/api/v1/companies/upload')
        .reply(200);

    const upload = render(<UploadData />)

    // ASSERT
    const studentFileUpdateButton = upload.container.querySelector('#company-upload')
      fireEvent.click(studentFileUpdateButton)
      const companyFileModal = upload.getByText('Choose file to upload')
      expect(companyFileModal).toBeVisible()
     
  
      const { getByTestId, getAllByTestId } = render(<UploadData />);
  
      const fileInput = getByTestId('company-input');
      const file = new File(['test file content'], 'test-company.xlsx', {
          type: 'text/plain',
      });
      fireEvent.change(fileInput, { target: { files: [file] } });
      const confirmButton = screen.getByRole('button', { name: 'CONFIRM' })
      fireEvent.click(confirmButton)
      await waitFor(()=>{
        expect(getAllByTestId("value-company")[0].firstChild.textContent).toBe(" test-company.xlsx")
      })
  })
})
