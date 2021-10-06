import mysql from "mysql2"

let students = []

const connection = mysql.createConnection({
    host: 'mysql-api-descomplica',
    user: 'root',
    password: 'pssS76TiD5', // Todo: Alterar essa informação para uma variável de ambiente
    database: 'api_descomplica'
})

export async function queryAll() {
    await connection.promise()
    .query('SELECT * FROM students')
    .then((rows) => rows[0])
    .then((rows) =>{
        console.log(rows)
        students = rows.map((item) => {
            return {
                id: item.id,
                name: item.name,
                email: item.email,
                cpf: item.cpf
            }
        })
    })
    .catch((err) => console.error(err))

    return students
}

export async function searchStudent(term) {
    let query = ['%' + term + '%', '%' + term + '%', '%' + term + '%']

    await connection.promise()
    .query('SELECT * FROM students WHERE name LIKE ? OR cpf LIKE ? OR email LIKE ?', query)
    .then(rows => rows[0])
    .then((rows) => {
        console.log(rows)
        students = rows.map((item) => {
            return {
                id: item.id,
                name: item.name,
                email: item.email,
                cpf: item.cpf
            }
        })

        console.log(students)
    })
    .catch((err) => console.log(err))

    return students
}

export async function createStudent(student) {
    var resultInfo = {}

    await connection.promise()
    .query('INSERT INTO students (name, email, cpf) VALUES (?, ?, ?)', student)
    .then(result => result[0])
    .then((result) => {
        resultInfo = {
            id: result.insertId,
            name: student[0],
            email: student[1],
            cpf: student[2]
        }
    })
    .catch((err) => {
        console.error(err)
        resultInfo = err.sqlMessage
    })

    console.log('Resultado da query:')
    console.info(resultInfo)

    return resultInfo
}
