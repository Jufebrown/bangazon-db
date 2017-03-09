#!/usr/bin/env node

'use strict'

// Create a database that is saved on disk.
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('employee.sqlite', (err) => console.log('Connected'))

const dropEmployees = () => {
  db.run(`DROP TABLE employees`)
}

// dropEmployees()

// Create a table titled employees with the following columns:
// id, firstName, lastName, jobTitle, address
db.run(`CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)`)

// Create an array of at least 6 objects. Each object should have a key value pair matching each column name in the employees table.
let employeeArray = [
  {id: 0, firstName: 'Fred', lastName: 'Flintstone', jobTitle: 'Crane Operator', address: '1 Bedrock Way'},
  {id: 0, firstName: 'Wilma', lastName: 'Flintstone', jobTitle: 'Homemaker', address: '1 Bedrock Way'},
  {id: 0, firstName: 'Chloe', lastName: 'Catherine', jobTitle: 'Lounger', address: '513 Stacy Square'},
  {id: 0, firstName: 'Sam', lastName: 'Gamgee', jobTitle: 'Mouser', address: '513 Stacy Square'},
  {id: 0, firstName: 'Chuck', lastName: 'Doggert', jobTitle: 'Panter', address: '9970 Welty Rd'},
  {id: 0, firstName: 'Matt', lastName: 'Smith', jobTitle: 'Doctor', address: '1 Milky Way'},
]

// Insert each of the employee objects into the database.
const populateEmployees = () => {
  employeeArray.forEach(each => {
    db.run(`INSERT INTO employees VALUES (
      null,
      "${each.firstName}",
      "${each.lastName}",
      "${each.jobTitle}",
      "${each.address}"
    )`)
  })
}

// populateEmployees()

// Write a statement to query the database and console.log() all employee records.
// db.all(`SELECT * FROM employees`, (err, allRows) => {
//   if (err) {
//     return console.log(err.toString())
//   }
//   // console.log('row', row)

//   // allRows.forEach(({id, first, last, department, salary}) => {
//   //   console.log(`
//   //     ${id} ${first} ${last}
//   //     from ${department} Department.
//   //     Salary: ${salary}
//   //   `)
//   // })
//   // let result = allRows.filter(each => each.salary > 50000)

//   console.log(allRows)

// })

// Write a statement to query the database and console.log() each employees jobTitle.
// db.each(`SELECT jobTitle FROM employees`, (err, row) => {
//   if (err) {
//     return console.log(err.toString())
//   }
//   console.log(row)
// })

// Write a statement to query the database and console.log() each employees firstName, lastName and address only.
db.each(`SELECT firstName, lastName, address FROM employees`, (err, row) => {
  if (err) {
    return console.log(err.toString())
  }
  console.log(row)
})
