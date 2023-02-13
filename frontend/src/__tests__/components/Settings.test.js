import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../../pages/Settings';
import { Button } from 'bootstrap';
import nock from 'nock';
import { beforeEach } from '@jest/globals';


beforeEach(()=>{
  nock('http://localhost:5222')
  .defaultReplyHeaders({
      'access-control-allow-origin': '*',
  })
  .persist()
  .get('/api/v1/settings')
  .reply(200, [{"setting_type":"EMAIL_DIRECTORY","setting_value":"qwerty"},{"setting_type":"INTERNSHIP_PERIOD","setting_value":"01/01/2023 - 03/01/2023"},{"setting_type":"RESUME_DIRECTORY","setting_value":"qwerty"}]);
})

test('Render title', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Settings - Saved');
  expect(title.nextElementSibling).toHaveTextContent('Make changes to file directories of emails and resumes.');
})

test('Render save changes button', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const saveBtn = screen.container.querySelector('#save-btn');
  expect(saveBtn).toHaveTextContent('SAVE CHANGES');
})

test('Render email directory header', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const emailHeader = screen.container.querySelector('#email-dir-header');
    expect(emailHeader).toHaveTextContent('Email Directory');
    expect(emailHeader.nextElementSibling).toHaveTextContent("Path is relative to user's root directory");
  })
  
  test('Render resume directory header', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const resumeHeader = screen.container.querySelector('#resume-dir-header');
    expect(resumeHeader).toHaveTextContent('Resume Directory');
    expect(resumeHeader.nextElementSibling).toHaveTextContent("Path is relative to user's root directory");
  })
  test('Render internship period header', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const internshipHeader = screen.container.querySelector('#internship-header');
    expect(internshipHeader).toHaveTextContent('Internship Period');
  })

  // =================================================================

  test('Render email & resume directory fields', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const fileDirectoryFields = screen.getAllByText('File Directory')
    expect(fileDirectoryFields.length).toBe(2)
  })
  
  test('Render update directory buttons', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const updateDirectoryButtons = screen.getAllByText('UPDATE DIRECTORY')
    expect(updateDirectoryButtons.length).toBe(2)
  })

  test('Render internship period field', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const internshipPeriodField = screen.getByText('DD/MM/YYYY - DD/MM/YYYY')
    expect(internshipPeriodField).toBeVisible()
  })
  
  test('Render update period button', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const updatePeriodButton = screen.getByRole('button',{name:'UPDATE PERIOD'})
    expect(updatePeriodButton).toBeVisible()
  })

  test('Render email directory modal', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const emailDirectoryUpdateButton = screen.getByTestId('email-dir-button')
    fireEvent.click(emailDirectoryUpdateButton)
    const emailDirectoryModal = screen.getByText('Enter Directory')
    expect(emailDirectoryModal).toBeVisible()
    const confirmButton = screen.getByRole('button',{name:'CONFIRM'})
    expect(confirmButton).toBeVisible()
    const input = screen.getByRole('textbox')
    expect(input).toBeVisible()
  })
  
  test('Render resume directory modal', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const resumeDirectoryUpdateButton = screen.getByTestId('resume-dir-button')
    fireEvent.click(resumeDirectoryUpdateButton)
    const resumeDirectoryModal = screen.getByText('Enter Directory')
    expect(resumeDirectoryModal).toBeVisible()
    const confirmButton = screen.getByRole('button',{name:'CONFIRM'})
    expect(confirmButton).toBeVisible()
    const input = screen.getByRole('textbox')
    expect(input).toBeVisible()
  })

  test('Render internship period directory modal', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const intPeriodUpdateButton = screen.getByTestId('update-period-button')
    fireEvent.click(intPeriodUpdateButton)
    const internshipPeriodField = screen.getByText('Select Internship Date Range')
    expect(internshipPeriodField).toBeVisible()
    const confirmButton = screen.getByRole('button',{name:'CONFIRM'})
    expect(confirmButton).toBeVisible()
    const input = screen.getByRole('textbox')
    expect(input).toBeVisible()
  })

  test('Save changes button state', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const saveBtn = screen.container.querySelector('#save-btn');

    const intPeriodUpdateButton = screen.getByTestId('update-period-button')
    fireEvent.click(intPeriodUpdateButton)
    
    const emailDirectoryUpdateButton = screen.getByTestId('email-dir-button')
    fireEvent.click(emailDirectoryUpdateButton)
    const emailInput = screen.getByTestId('email-dir')
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, {target: {value: 'asdasdasd'}})
    const emailConfirmButton = screen.getByTestId('confirm-email-dir')
    fireEvent.click(emailConfirmButton)
    const intConfirmButton = screen.getByTestId('confirm-internship-period')
    fireEvent.click(intConfirmButton)
    const intInput = screen.getByTestId('int-period')
    fireEvent.click(intInput)
    fireEvent.change(intInput, {target: {value: '02/12/2023 - 10/12/2025'}})

    const resumeDirectoryUpdateButton = screen.getByTestId('resume-dir-button')
    fireEvent.click(resumeDirectoryUpdateButton)
    const resumeInput = screen.getByTestId('resume-dir')
    fireEvent.click(resumeInput)
    fireEvent.change(resumeInput, {target: {value: 'asdasdasd'}})
    const resumeConfirmButton = screen.getByTestId('confirm-resume-dir')
    fireEvent.click(resumeConfirmButton)

    expect(saveBtn).toBeEnabled();
  })

  test('Save changes post', async () => {
    nock('http://localhost:5222')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
        })
        .persist()
        .post('/api/v1/settings', {
          email_dir: 'asdasdasd',
          resume_dir: 'asdasdasd',
          internship_period:"02/12/2023 - 10/12/2025",
        })
        .reply(200, []);

    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    expect(screen.getAllByText("Settings - Saved")[0]).toBeInTheDocument();

    const saveBtn = screen.container.querySelector('#save-btn');
    
    
    const emailDirectoryUpdateButton = screen.getByTestId('email-dir-button')
    fireEvent.click(emailDirectoryUpdateButton)
    const emailInput = screen.getByTestId('email-dir')
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, {target: {value: 'asdasdasd'}})
    const emailConfirmButton = screen.getByTestId('confirm-email-dir')
    fireEvent.click(emailConfirmButton)

    expect(screen.getAllByText("Settings - Not Saved")[0]).toBeInTheDocument();

    const resumeDirectoryUpdateButton = screen.getByTestId('resume-dir-button')
    fireEvent.click(resumeDirectoryUpdateButton)
    const resumeInput = screen.getByTestId('resume-dir')
    fireEvent.click(resumeInput)
    fireEvent.change(resumeInput, {target: {value: 'asdasdasd'}})
    const resumeConfirmButton = screen.getByTestId('confirm-resume-dir')
    fireEvent.click(resumeConfirmButton)

    const intPeriodUpdateButton = screen.getByTestId('update-period-button')
    fireEvent.click(intPeriodUpdateButton)
    const intInput = screen.getByTestId('int-period')
    fireEvent.click(intInput)
    fireEvent.change(intInput, {target: {value: '02/12/2023 - 10/12/2025'}})
    const intConfirmButton = screen.getByTestId('confirm-internship-period')
    fireEvent.click(intConfirmButton)
    expect(saveBtn).toBeEnabled();
    
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(
          screen.getAllByText("Settings - Saved")[0]
      ).toBeInTheDocument();
  });
  })


  test('Load settings', async () => {
    nock('http://localhost:5222')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
        })
        .persist()
        .get('/api/v1/settings')
        .reply(200, [{"setting_type":"EMAIL_DIRECTORY","setting_value":"qwerty"},{"setting_type":"INTERNSHIP_PERIOD","setting_value":"12345"},{"setting_type":"RESUME_DIRECTORY","setting_value":"qwerty"}]);

    render(<Settings />);

    await waitFor(() => {
        expect(
            screen.getAllByText("qwerty")[0]
        ).toBeInTheDocument();
    });
  })

// //TODO:: Functional tests

