import {render, screen} from '@testing-library/react';
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
