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

test('Render table rows', async () => { 
    // ARRANGE
    nock('http://localhost:5222')
   .defaultReplyHeaders({
       'access-control-allow-origin': '*',
   })
   .persist()
   .get('/api/v1/students') 
   .reply(200, [
       {
       "student_id": "S12345670A",
       "name": "Student 1",
       "preference": "Software Development",
       "status": "PENDING_CONFIRMATION",
       "company_id": 2
       },
       {
       "student_id": "S12345677H",
       "name": "Student 8",
       "preference": "Software Development",
       "status": "UNASSIGNED",
       "company_id": null
       },
       {
       "student_id": "S12345678I",
       "name": "Student 9",
       "preference": "Documents, QA Testing and Development",
       "status": "UNASSIGNED",
       "company_id": null
       }
   ]);


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

   render(<MatchStudent/>);

   // ASSERT
   await waitFor(() => {
       expect(
           screen.getAllByRole("row").length
       ).toBe(4); // 3 + 1 header
   });
})

test('Load company dropdown', async () => {
    render(<MatchStudent/>);

    // ASSERT
    await waitFor(() => {
        expect(screen.getAllByTestId('company-dropdown')[0].children.length).toBe(5) // 4 + "select a company" default
    });
})

test('Load status dropdown', async () => {
    render(<MatchStudent/>);

    // ASSERT
    await waitFor(() => {
        expect(screen.getAllByTestId('status-dropdown')[0].children.length).toBe(3) // 4 + "select a company" default
    });
})