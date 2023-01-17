import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../../pages/Settings';
import { Button } from 'bootstrap';

test('Render title', async () => {
  // ARRANGE
  const screen = render(<Settings />);

  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Settings');
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
  })
  
  test('Render resume directory header', async () => {
    // ARRANGE
    const screen = render(<Settings />);
  
    // ASSERT
    const resumeHeader = screen.container.querySelector('#resume-dir-header');
    expect(resumeHeader).toHaveTextContent('Resume Directory');
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
  })
  
  test('Render resume directory modal', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const resumeDirectoryUpdateButton = screen.getByTestId('resume-dir-button')
    fireEvent.click(resumeDirectoryUpdateButton)
    const resumeDirectoryModal = screen.getByText('Enter Directory')
    expect(resumeDirectoryModal).toBeVisible()
  })

  test('Render internship period directory modal', async () => {
    // ARRANGE
    const screen = render(<Settings />);

    // ASSERT
    const intPeriodUpdateButton = screen.getByTestId('update-period-button')
    fireEvent.click(intPeriodUpdateButton)
    const internshipPeriodField = screen.getByText('Select Internship Date Range')
    expect(internshipPeriodField).toBeVisible()
  })

// //TODO:: Functional tests
