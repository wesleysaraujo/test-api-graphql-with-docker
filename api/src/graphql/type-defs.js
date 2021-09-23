import { gql } from "apollo-server-core"

const typeDefs = gql`
    type Student {
        id: ID!
        name: String!
        email: String!
        cpf: String!
    }

    type Query {
        students: [Student!]!
        searchStudent(q: String!): [Student]
    }

    type Mutation {
        createStudent(name: String!, email: String!, cpf: String!): Student
    }
`

export default typeDefs