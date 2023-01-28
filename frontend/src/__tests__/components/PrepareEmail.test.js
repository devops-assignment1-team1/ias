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

test('Render table', async () => { 
    // ARRANGE
    const screen = render(<PrepareEmail />);

    // ASSERT
    expect(screen.getByRole('table')).toBeVisible()
    expect(screen.getAllByRole('row')[0]).toHaveTextContent("Student ID")
    expect(screen.getAllByRole('row')[0]).toHaveTextContent("Student Name")
    expect(screen.getAllByRole('row')[0]).toHaveTextContent("Preference")
    expect(screen.getAllByRole('row')[0]).toHaveTextContent("Company")
})

test('Render table rows', async() => { 
    // ARRANGE
    nock('http://localhost:5222')
    .defaultReplyHeaders({
        'access-control-allow-origin': '*',
    })
    .persist()
    .get('/api/v1/students?status=PENDING_CONFIRMATION') // TODO :: update this
    .reply(200, [
        {
        "student_id": "s10205479",
        "name": "lincoln",
        "preference": "Software",
        "status": "PENDING_CONFIRMATION",
        "company_id": 1
        },
        {
        "student_id": "S12345677H",
        "name": "Student 8",
        "preference": "Software Development",
        "status": "PENDING_CONFIRMATION",
        "company_id": 1
        }
    ]
    );

    nock('http://localhost:5222')
  .defaultReplyHeaders({
      'access-control-allow-origin': '*',
  })
  .persist()
  .get('/api/v1/companies')
  .reply(200, [
    {
      "company_id": 1,
      "company_name": "Company A",
      "job_role": "Software Developer",
      "company_contact": "Mr A",
      "email": "A@email.com"
    },
    {
      "company_id": 2,
      "company_name": "Company B",
      "job_role": "Software QA",
      "company_contact": "Ms B",
      "email": "B@email.com"
    },
    {
      "company_id": 3,
      "company_name": "Company C",
      "job_role": "Intern",
      "company_contact": "Mdm C",
      "email": "C@email.com"
    },
    {
      "company_id": 4,
      "company_name": "Company D",
      "job_role": "Documentation Team",
      "company_contact": "Dr D",
      "email": "D@email.com"
    }
  ]);
         
    render(<PrepareEmail />);
    
    // ASSERT
    await waitFor(() => {
        expect(
            screen.getAllByRole("row").length
        ).toBe(3); // 2 + 1 header
    });
})

test('Prepare email post', async () => { 
    nock('http://localhost:5222')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
        })
        .persist()
        .post('/api/v1/students/generateEmail')
        .reply(200,[]);

    // ARRANGE
    const screen = render(<PrepareEmail />);

    // ASSERT
    const generateEmailBtn = screen.container.querySelector('#email-btn');
    fireEvent.click(generateEmailBtn);

    await waitFor(() => {
        expect(
            screen.getByText("Prepare Emails - Email Prepared")
        ).toBeInTheDocument();
    });
})