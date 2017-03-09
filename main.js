#!/usr/bin/env node

'use strict'

// Create a database that is saved on disk.
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('bangazon.sqlite', (err) => console.log('Connected'))


/*******************************
Drop table functions
*******************************/
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


/*******************************
Tables Creation
*******************************/

// customers table
// This table will store the following information
// A unique customer id (integer).
// customer name
// street address
// city
// state
// postal code
// phone number
db.run(`CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, address TEXT, city TEXT, state TEXT, postcode TEXT, phone_number TEXT)`)

// payment_options table
// This table will contain the following information
// A unique payment option id (integer)
// Payment option name
// Payment option account number
db.run(`CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, payment_options_id INTEGER, paid_in_full BOOLEAN)`)

// products table
// This table will store the following information
// A unique product id (integer)
// Product name
// Product price
db.run(`CREATE TABLE IF NOT EXISTS order_line_item (order_line_item_id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, products_id INTEGER)`)

// orders table
// This table will store the following information
// A unique order id (integer)
// The order's customer id
// The order's payment option id
// Whether the order has been paid in full
db.run(`CREATE TABLE IF NOT EXISTS payment_options (payment_options_id INTEGER PRIMARY KEY AUTOINCREMENT, payment_option_name TEXT, payment_option_account_number TEXT)`)

// order_line_items table
// This table will store the following information
// A unique line item id (integer)
// The order id
// The product id
db.run(`CREATE TABLE IF NOT EXISTS products (products_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT, product_price TEXT)`)

// Array for customer table population
let customerArray = [
  {id: 0, firstName: 'Fred', lastName: 'Flintstone', address: '1 Bedrock Way', city: 'Bedrock', state: 'Pangaea', postcode: '37211', phone_number: '555-555-5555'},
  {id: 0, firstName: 'Wilma', lastName: 'Flintstone', address: '1 Bedrock Way', city: 'Bedrock', state: 'Pangaea', postcode: '37211', phone_number: '555-555-5555'},
  {id: 0, firstName: 'George', lastName: 'Burns', address: '2 Mulholland Drive', city: 'Los Angeles', state: 'CA', postcode: '15101', phone_number: '555-555-6666'},
  {id: 0, firstName: 'Lucille', lastName: 'Ball', address: '64 Rodeo Dr', city: 'Beverly Hills', state: 'CA', postcode: '90210', phone_number: '555-555-7777'},
  {id: 0, firstName: 'Desi', lastName: 'Arnez', address: '64 Rodeo Dr', city: 'Beverly Hills', state: 'CA', postcode: '90210', phone_number: '555-555-7777'},
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
