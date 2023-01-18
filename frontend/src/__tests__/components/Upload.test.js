import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadData from '../../pages/UploadData';

test('Render title', async () => {
  // ARRANGE
  const screen = render(<UploadData />);

  // ASSERT
  const title = screen.container.querySelector('#title');
  expect(title).toHaveTextContent('Upload Data');
  expect(title.nextElementSibling).toHaveTextContent('Upload the corresponding excel files for the current semester here.');
})