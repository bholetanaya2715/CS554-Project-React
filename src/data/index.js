const usersData = require("./users");
const accountData = require("./account");
const waterData = require("./water/water");
const historyData = require("./foodHistory")
const pdfData = require("./pdf")

module.exports = {
  users: usersData,
  account: accountData,
  water: waterData,
  history: historyData,
  pdf: pdfData
}; 