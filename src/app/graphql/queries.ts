import gql from 'graphql-tag';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      first_name
      last_name
      email
      gender
      job_title
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;
