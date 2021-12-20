const addWeeks = require('date-fns/addWeeks')
const addMonth = require('date-fns/addMonths')
const today = new Date()
const frequency = "one"

let nextNotification = (frequency === "weekly") ? addWeeks(today, 1) : (frequency === "two weekly") ? addWeeks(today, 2) : addMonth(today, 1)
console.log(nextNotification)