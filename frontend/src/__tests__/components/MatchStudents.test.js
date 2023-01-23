import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchStudent from '../../pages/MatchStudent';
import nock from 'nock';
import { beforeEach } from '@jest/globals';

test('Render title', async () => { 
    // ARRANGE
    const screen = render(<MatchStudent />);

    // ASSERT
    const title = screen.container.querySelector('#title');
    expect(title).toHaveTextContent('Match Students');
    expect(title.nextElementSibling).toHaveTextContent('Match students to companies and update their status here.');
})

