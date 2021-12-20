const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('../dbConfigs');
const notificationServices = require('../Services/notification');
app.use(bodyParser.json());
const addWeeks = require('date-fns/addWeeks')
const addMonth = require('date-fns/addMonths');
app.use(cors());
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
const {
    watered
} = require('../Services/notification');
const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
const today = new Date()

app.post('/notification/create', async (req, res) => {
    let nextNotification = req.body.nextNotification
    const {
        userId,
        plantId,
        frequency,
        plantName,
        userEmail
    } = req.body
    nextNotification = (frequency === "weekly") ? addWeeks(today, 1) :
        (frequency === "two weekly") ? addWeeks(today, 2) :
        addMonth(today, 1)

    const data = {
        userId,
        plantId,
        frequency,
        plantName,
        nextNotification,
        userEmail

    }
    try {
        await dbConnection()
        const notification = await notificationServices.createNotification(data)
        if (notification)
            return res.status(200).send('Notification Created successfully')


    } catch (error) {
        return {
            message: error.message
        }


    }



})
app.get('/notification/cron-get/', async (req, res) => {
    await dbConnection()
    try {
        //filter for today and active
        const filter = {
            $and: [{
                    status: "active"
                },
                {
                    nextNotification: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            ]

        }
        const notifications = await notificationServices.dueNootification(filter)
        if (notifications) return res.status(200).json(notifications)


    } catch (error) {
        return {
            message: error.message
        }

    }


})

//update notifications
app.get('/notification/cron-update/', async (req, res) => {
    await dbConnection()
    try {
        //filter for today and active
        const todayFilter = {
            $and: [{
                    status: "active"
                },
                {
                    nextNotification: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }


            ]
        }

        const nextNotification = [{
            $set: {
                nextNotification: {
                    $switch: {
                        branches: [{
                                case: {
                                    $eq: ["$frequency", 'weekly']
                                },
                                then: addWeeks(today, 1)
                            },
                            {
                                case: {
                                    $eq: ["$frequency", 'two weekly']
                                },
                                then: addWeeks(today, 2)
                            },
                            {
                                case: {
                                    $eq: ["$frequency", 'monthly']
                                },
                                then: addMonth(today, 1)
                            }
                        ],
                        default: ""
                    }
                },

            }

        }]


        const updatedNotfication = await notificationServices.updateNotification(todayFilter, nextNotification)
        if (updatedNotfication) return res.status(200).json(updatedNotfication)


    } catch (error) {
        return {
            message: error.message
        }

    }


})

app.get('/notification/watering/', async (req, res) => {
    const plantId = req.body.plantId
    const userId = req.body.userId
    const filter = {
        userId: userId,
        plantId: plantId
    }
    const update = {
        $set: {
            watered: "true"
        },
        $inc: {
            wateringCount: 1
        }
    }
    console.log(filter, update)
    try {

        await dbConnection()
        const watered = await notificationServices.watered(filter, update)
        if (watered) return res.status(200).json(watered)

    } catch (error) {

    }


})
app.put('/notification/status/update/', async (req, res) => {
    const plantId = req.body.plantId
    const userId = req.body.userId
    const notificationStatus = req.body.status
    const filter = {
        userId: userId,
        plantId: plantId
    }
    const update = {
        $set: {
            status: notificationStatus
        },

    }
    console.log(filter, update)
    try {

        await dbConnection()
        const watered = await notificationServices.updateStatus(filter, update)
        if (watered) return res.status(200).json(watered)

    } catch (error) {

    }


})






























module.exports.handler = serverless(app);