import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
  mutation Signup($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $job_title: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String!
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      job_title: $job_title
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    employee(id: $id) {
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

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $job_title: String!
    $salary: Float!
    $date_of_joining: String!
    $department: String!
    $employee_photo: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      job_title: $job_title
      salary: $salary
      date_of_joining: $date_of_joining
      department: $department
      employee_photo: $employee_photo
    ) {
      id
    }
  }
`;
