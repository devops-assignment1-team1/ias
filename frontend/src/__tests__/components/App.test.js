import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import { createMemoryHistory } from 'history';
import App from '../../App';

test('Render footer', async () => {
  // ARRANGE
  const screen = render(<MemoryRouter> initialEntries={['/Main']}
    <App />
    </MemoryRouter>);

  // ASSERT
  const footer = screen.container.querySelector('#footer');
  expect(footer).toHaveTextContent('IAS 2023');
})


