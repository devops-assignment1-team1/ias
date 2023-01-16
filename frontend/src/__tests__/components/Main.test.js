import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../../pages/Main';
import { Button } from 'bootstrap';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

test('Render title', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter><Main/></MemoryRouter>);
  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Easy Student Internship Management');
  expect(title.nextElementSibling).toHaveTextContent('One-stop application to manage all internship matters.'); 
})
