#!/usr/bin/env node

'use strict'

// Create a database that is saved on disk.
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('bangazon.sqlite', (err) => console.log('Connected'))

const dropCustomers = () => {
  db.run(`DROP TABLE customers`)
}

// dropCustomers()

const dropOrders = () => {
  db.run(`DROP TABLE orders`)
}

// dropOrders()

const dropOrderLineItem = () => {
  db.run(`DROP TABLE order_line_item`)
}

// dropOrderLineItem()

const dropPaymentOptions = () => {
  db.run(`DROP TABLE payment_options`)
}

// dropPaymentOptions()

const dropProducts = () => {
  db.run(`DROP TABLE products`)
}

// dropProducts()

// Create a table titled employees with the following columns:
// id, firstName, lastName, jobTitle, address
db.run(`CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, address TEXT, city TEXT, state TEXT, postcode TEXT, phone_number TEXT)`)

db.run(`CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, payment_options_id INTEGER, paid_in_full BOOLEAN)`)

db.run(`CREATE TABLE IF NOT EXISTS order_line_item (order_line_item_id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, products_id INTEGER)`)

db.run(`CREATE TABLE IF NOT EXISTS payment_options (payment_options_id INTEGER PRIMARY KEY AUTOINCREMENT, payment_option_name TEXT, payment_option_account_number TEXT)`)

db.run(`CREATE TABLE IF NOT EXISTS products (products_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT, product_price TEXT)`)

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
