'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

/**
 * @description Đếm số lượng kết nối
 */
const countConnect = () => {
  const numberConnect = mongoose.connections.length
  console.log(`Number of connections:: `, numberConnect)
}

/**
 * @description Kiểm tra overload connection
 */
const checkOverload = () => {
  setInterval(() => {
    const numberConnect = mongoose.connections.length // Số lượng kết nối
    const numCores = os.cpus().length // Số lượng core của máy
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024 // Đơn vị byte

    // example: maximum number of connections based on number osf cores
    const maxConnections = numCores * 5 // Số lượng kết nối tối đa

    console.log(`Active connections:: ${numberConnect}`)
    console.log(`Memory usage:: ${memoryUsage} MB`)

    if (numberConnect > maxConnections) {
      console.log(`Overload connection detected!`)
    }
  }, _SECONDS) // Màn hình console sẽ hiển thị thông báo sau mỗi 5s
}

module.exports = { countConnect, checkOverload }
