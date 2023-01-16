import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../../pages/Main';
import {MemoryRouter} from 'react-router-dom'

test('Render title', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);
  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Easy Student Internship Management');
  expect(title.nextElementSibling).toHaveTextContent('One-stop application to manage all internship matters.'); 
})

test('Render upload segment', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);

  // ASSERT
  expect(screen.getByText('Upload current internship data in excel format for internship students and companies.')).toBeVisible();

  const uploadFileButton = screen.getByRole('button',{name:'UPLOAD FILE'})
  expect(uploadFileButton).toBeVisible()
})

test('Render match student segment', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);

  // ASSERT
  expect(screen.getByText('Match students to their prospective companies and manage their status of internship.')).toBeVisible();

  const uploadFileButton = screen.getByRole('button',{name:'MATCH STUDENT'})
  expect(uploadFileButton).toBeVisible()
})

test('Render prepare emails segment', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);

  // ASSERT
  expect(screen.getByText('Prepare emails for students attached to their prospective companies with their resumes.')).toBeVisible();

  const uploadFileButton = screen.getByRole('button',{name:'PREPARE EMAILS'})
  expect(uploadFileButton).toBeVisible()
})

test('Render settings segment', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);

  // ASSERT
  expect(screen.getByText('Make changes to the file directories of emails , resumes and semester date range.')).toBeVisible();

  const uploadFileButton = screen.getByRole('button',{name:'SETTINGS'})
  expect(uploadFileButton).toBeVisible()
})
