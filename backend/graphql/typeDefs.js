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

  type Query {
    _: Boolean
  }

  type Mutation {
    signup(email: String!, firstName: String!, lastName: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
