import { createStudent, queryAll, searchStudent } from "../datasets/Student.js"

const resolvers = {
    Query: {
        students: () => queryAll(),
        searchStudent: (_, args) => {
            return searchStudent(args.q)
        }
    },
    Mutation: {
        // Todo: É preciso tratar erros de inserção no banco
        createStudent: (_, args) => {
            const newStudent = [args.name, args.email, args.cpf]

            return createStudent(newStudent)
        }
    }
}

export default resolvers