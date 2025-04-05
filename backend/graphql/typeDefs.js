import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    job_title: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type Query {
    employees: [Employee!]!
  }

  type Mutation {
    signup(email: String!, firstName: String!, lastName: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      job_title: String!
      salary: Float!
      date_of_joining: String!
      department: String!
      employee_photo: String
    ): Employee!
  }
`;
