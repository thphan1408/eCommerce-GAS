'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')

const connectString = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

/**
 * @description Cách connect cũ của mongoose
 */
// mongoose
//   .connect(connectString)
//   .then(() => {
//     console.log('Connected to MongoDB')
//   })
//   .catch((err) => {
//     console.error(`Error connecting to MongoDB: ${err}`)
//   })

// // Enviroment Dev only
// if (1 === 1) {
//   mongoose.set('debug', true)
//   mongoose.set('debug', { color: true })
// }

/**
 * @description Cách connect khuyên dùng của mongoose với singletons pattern
 */
class Database {
  constructor() {
    this._connect()
  }

  //Connect to the database
  _connect(type = 'mongodb') {
    // Enviroment Dev only
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log('Connected to MongoDB', countConnect)
      })
      .catch((err) => console.error(`Error connecting to MongoDB: ${err}`))
  }

  // Dùng để tạo một hàm getInstance
  static getInstance() {
    if (!this.database) {
      this.database = new Database()
    }
    return this.database
  }
}

// Tạo một instance của class Database
const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
