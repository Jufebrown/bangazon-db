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
db.run(`CREATE TABLE IF NOT EXISTS customers (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  lastName TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postcode TEXT,
  phone_number TEXT
)`)

// orders table
// This table will store the following information
// A unique order id (integer)
// The order's customer id
// The order's payment option id
// Whether the order has been paid in full
db.run(`CREATE TABLE IF NOT EXISTS orders (
  order_id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  payment_options_id INTEGER,
  paid_in_full INTEGER,
  FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY(payment_options_id) REFERENCES payment_options(payment_options_id)
)`)

// order_line_items table
// This table will store the following information
// A unique line item id (integer)
// The order id
// The product id
db.run(`CREATE TABLE IF NOT EXISTS order_line_item (
  order_line_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  products_id INTEGER,
  FOREIGN KEY(order_id) REFERENCES order(order_id),
  FOREIGN KEY(products_id) REFERENCES products(products_id)
)`)

// payment_options table
// This table will contain the following information
// A unique payment option id (integer)
// Payment option name
// Payment option account number
db.run(`CREATE TABLE IF NOT EXISTS payment_options (
  payment_options_id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_option_name TEXT,
  payment_option_account_number TEXT
)`)

// products table
// This table will store the following information
// A unique product id (integer)
// Product name
// Product price
db.run(`CREATE TABLE IF NOT EXISTS products (
  products_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT,
  product_price TEXT
)`)

// Array for customer table population
let customerArray = [
  {id: 0, firstName: 'Fred', lastName: 'Flintstone', address: '1 Bedrock Way', city: 'Bedrock', state: 'Pangaea', postcode: '37211', phone_number: '555-555-5555'},
  {id: 0, firstName: 'Wilma', lastName: 'Flintstone', address: '1 Bedrock Way', city: 'Bedrock', state: 'Pangaea', postcode: '37211', phone_number: '555-555-5555'},
  {id: 0, firstName: 'George', lastName: 'Burns', address: '2 Mulholland Drive', city: 'Los Angeles', state: 'CA', postcode: '15101', phone_number: '555-555-6666'},
  {id: 0, firstName: 'Lucille', lastName: 'Ball', address: '64 Rodeo Dr', city: 'Beverly Hills', state: 'CA', postcode: '90210', phone_number: '555-555-7777'},
  {id: 0, firstName: 'Desi', lastName: 'Arnez', address: '64 Rodeo Dr', city: 'Beverly Hills', state: 'CA', postcode: '90210', phone_number: '555-555-7777'},
]

// Array for orders table population
let ordersArray = [
  {id: 0, customerId: 1, paymentOptionsId: 1, paidInFull: 1},
  {id: 0, customerId: 2, paymentOptionsId: 4, paidInFull: -1},
  {id: 0, customerId: 5, paymentOptionsId: 3, paidInFull: 1},
  {id: 0, customerId: 3, paymentOptionsId: 2, paidInFull: -1},
  {id: 0, customerId: 1, paymentOptionsId: 1, paidInFull: 1},
  {id: 0, customerId: 4, paymentOptionsId: 4, paidInFull: 1},
  {id: 0, customerId: 1, paymentOptionsId: 1, paidInFull: -1},
  {id: 0, customerId: 1, paymentOptionsId: 3, paidInFull: 1},
]

// Array for order_line_item table population
let orderLineItemArray = [
  {id: 0, orderId: 1, productId: 4},
  {id: 0, orderId: 1, productId: 5},
  {id: 0, orderId: 2, productId: 1},
  {id: 0, orderId: 2, productId: 2},
  {id: 0, orderId: 2, productId: 3},
  {id: 0, orderId: 3, productId: 4},
  {id: 0, orderId: 3, productId: 5},
  {id: 0, orderId: 3, productId: 1},
  {id: 0, orderId: 4, productId: 2},
  {id: 0, orderId: 4, productId: 3},
  {id: 0, orderId: 5, productId: 4},
  {id: 0, orderId: 6, productId: 5},
  {id: 0, orderId: 7, productId: 1},
  {id: 0, orderId: 8, productId: 2},
  {id: 0, orderId: 8, productId: 3},
]

// Array for payment_options table population
let paymentOptionsArray = [
  {id: 0, paymentOptionName: 'VISA', paymentOptionAccountNumber: '001'},
  {id: 0, paymentOptionName: 'Mastercard', paymentOptionAccountNumber: '002'},
  {id: 0, paymentOptionName: 'American Express', paymentOptionAccountNumber: '003'},
  {id: 0, paymentOptionName: 'Paypal', paymentOptionAccountNumber: '004'},
]

// Array for products table population
let productsArray = [
  {id: 0, productName: 'Toe Tunes', productPrice: '19.95'},
  {id: 0, productName: 'Handerpants', productPrice: '5.67'},
  {id: 0, productName: 'Picnic Pants', productPrice: '34.97'},
  {id: 0, productName: 'Stuffed Poop Emoji', productPrice: '49.99'},
  {id: 0, productName: 'Hairy Earplugs', productPrice: '4.99'},
]

// Insert each of the customer objects into the database.
const populateCustomers = () => {
  customerArray.forEach(each => {
    db.run(`INSERT INTO customers VALUES (
      null,
      "${each.firstName}",
      "${each.lastName}",
      "${each.address}",
      "${each.city}",
      "${each.state}",
      "${each.postcode}",
      "${each.phone_number}"
    )`)
  })
}
// populateCustomers()

// Insert each of the order objects into the database.
const populateOrders = () => {
  ordersArray.forEach(each => {
    db.run(`INSERT INTO orders VALUES (
      null,
      each.customerId,
      each.paymentOptionsId,
      each.paidInFull
    )`)
  })
}
// populateOrders()

// Insert each of the order line items objects into the database.
const populateOrderLineItems = () => {
  orderLineItemArray.forEach(each => {
    db.run(`INSERT INTO order_line_item VALUES (
      null,
      each.orderId,
      each.productId
    )`)
  })
}
// populateOrderLineItems()

// Insert each of the payment options objects into the database.
const populatePaymentOptions = () => {
  paymentOptionsArray.forEach(each => {
    db.run(`INSERT INTO payment_options VALUES (
      null,
      "${each.paymentOptionName}",
      "${each.paymentOptionAccountNumber}"
    )`)
  })
}
// populatePaymentOptions()

// Insert each of the products objects into the database.
const populateProducts = () => {
  productsArray.forEach(each => {
    db.run(`INSERT INTO products VALUES (
      null,
      "${each.productName}",
      "${each.productPrice}"
    )`)
  })
}
// populateProducts()

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
