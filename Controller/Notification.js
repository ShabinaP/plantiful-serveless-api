const { BSONSymbol } = require("mongodb");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    
        },
    plantId: {
      type: String
    },
    userEmail: {
      type: String,
   
    },
    watered: {
      type: Boolean,
      default: false,
    },

    wateringCount: {
      type: Number,
    
    },
    lastNotification: {
      type: Date,
   
    },
    nextNotification: {
      type: Date,
    },
    notificationCount: {
      type: Number,
    },

    frequency: {
      type: String,
     
    },
    plantName: {
      type: String,
  
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);