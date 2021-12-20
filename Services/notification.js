const Notification = require('../Model/Notification')
const startOfDay = require('date-fns/startOfDay')
const endOfDay = require('date-fns/endOfDay')
const today = new Date()

module.exports = {
    async createNotification(data) {

        const notifications = await Notification.create(data)
        if (notifications) {
            return {
                data: notifications,
                message: "Notification created successfully"
            }
        }
        return "Error creating Notification "

    },
    async dueNootification(filter) {

        const dueNotics = await Notification.find(filter)
        if (dueNotics) {
            return {
                data: dueNotics,
                message: "Data fecthed"
            }
        }
        return "Error occurred retrieving data"

    },
    async updateNotification(todayFilter, nextNotification) {

        const updatedNotifications = await Notification.find(todayFilter).updateMany(nextNotification)
        if (updatedNotifications) {
            return {
                data: updatedNotifications,
                message: "Notifications updated "
            }
        }
        return "Error occurred retrieving data"

    },
    async watered(filter, update) {
        // const plantId = `61b60a0351220447d699ba1c`
        const registerWatering = await Notification.findOneAndUpdate(filter, update)
        if (registerWatering) {
            return {
                data: registerWatering,
                message: "got something back "
            }
        }
    },
    async updateStatus(filter, update) {
        const updatedStatus = await Notification.findOneAndUpdate(filter, update)
        if (updatedStatus) {
            return {
                data: updatedStatus,
                message: "got something back "
            }
        }
    }





























};