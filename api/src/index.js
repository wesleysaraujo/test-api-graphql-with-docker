const { ApolloServer, gql } = require('apollo-server')
const mysql = require('mysql2')

// Toda request é POST
// Toda request bate no mesmo endpoint (/graphql)

// Query -> Equivalente a GET
// Mutation -> Equivalente a POST/PUT/PATCH/DELETE
// Scalar Types => String, Int, Boolean, Float e ID

const connection = mysql.createConnection({
    host: 'mysql-api-descomplica',
    user: 'root',
    password: 'pssS76TiD5', // Todo: Alterar essa informação para uma variável de ambiente
    database: 'api_descomplica'
})

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
let students = []

// Consulta na tabela de alunos
connection.query(
    { sql: 'SELECT * FROM students', rowAsArray: true}, 
     (err, rows, fields) => {
        if (err) {
            console.error(err)
        }

        students = rows.map((item) => {
            return {
                id: item.id,
                name: item.name,
                email: item.email,
                cpf: item.cpf
            }
        })
    })

// Resolvers
const resolvers = {
    Query: {
        students: () => students,
        searchStudent: (_, args) => {
            let query = []

            for (p = 0; p < 3; p++) {
                query.push('%' + args.q + '%')
            }

            return connection.promise().query('SELECT * FROM students WHERE name LIKE ? OR cpf LIKE ? OR email LIKE ?', query)
            .then((rows) => {
                student = rows[0].map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        cpf: item.cpf
                    }
                })

                console.log(student)

                return student
            })
            .catch((err) => console.log(err))
            //.then(() => connection.end())
        }
    },
    Mutation: {
        createStudent: (_, args) => {
            const newStudent = {
                id: 10,
                name: args.name,
                email: args.email,
                cpf: args.cpf
            }

            students.push(newStudent)

            return newStudent
        }
    }
}

// Apollo Server
const server = new ApolloServer({typeDefs, resolvers})

// Log do statu do servidor
server.listen().then(({ url }) => console.log(`Server starded at ${url}`))