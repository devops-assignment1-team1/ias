import {render, waitFor, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import PrepareEmail from '../../pages/PrepareEmail';
import nock from 'nock';
import { beforeEach} from '@jest/globals';

test('Render title', async () => { 
    // ARRANGE
    const screen = render(<PrepareEmail />);

    // ASSERT
    const title = screen.container.querySelector('#title');
    expect(title).toHaveTextContent('Prepare Emails');
    expect(title.nextElementSibling).toHaveTextContent('Manage emails to companies for students here. Select student to prepare their email.');
})

test('Render prepare email button', async () => { 
    // ARRANGE
    const screen = render(<PrepareEmail />);

    // ASSERT
    const saveBtn = screen.container.querySelector('#email-btn');
    expect(saveBtn).toHaveTextContent('PREPARE EMAIL');
})