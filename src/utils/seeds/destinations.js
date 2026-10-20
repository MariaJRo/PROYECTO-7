require('dotenv').config()

const mongoose = require('mongoose')
const Destination = require('../../api/models/destinations')
const destinations = require('../../data/destinations')

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    await Destination.collection.drop()

    await Destination.insertMany(destinations)

    console.log('Destinations seed completed')
  } catch (error) {
    console.error('Error while launching seed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

launchSeed()
