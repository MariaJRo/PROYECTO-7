const Trip = require('../models/trips')

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ verified: true }).populate('destinations')
    return res.status(200).json(trips)
  } catch (error) {
    return res.status(400).json('Error getting trips')
  }
}

const getTripsAdmin = async (req, res, next) => {
  try {
    const trips = await Trip.find({ verified: false }).populate('destinations')
    return res.status(200).json(trips)
  } catch (error) {
    return res.status(400).json('Error getting trips')
  }
}

const getTripById = async (req, res, next) => {
  try {
    const { id } = req.params
    const trip = await Trip.findById(id).populate('destinations')
    return res.status(200).json(trip)
  } catch (error) {
    return res.status(400).json('Error getting trip')
  }
}

const postTrip = async (req, res, next) => {
  try {
    const newTrip = new Trip(req.body)

    if (req.user.rol === 'admin') {
      newTrip.verified = true
    } else {
      newTrip.verified = false
    }
    const tripSaved = await newTrip.save()
    return res.status(201).json(tripSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error creating trip')
  }
}

const putTrip = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldTrip = await Trip.findById(id)
    const newTrip = new Trip(req.body)
    newTrip._id = id
    newTrip.destinations = [...oldTrip.destinations, ...req.body.destinations]
    const tripUpdated = await Trip.findByIdAndUpdate(id, newTrip, { new: true })
    return res.status(200).json(tripUpdated)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error updating trip')
  }
}

const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params
    const tripDeleted = await Trip.findByIdAndDelete(id)
    return res.status(200).json(tripDeleted)
  } catch (error) {
    return res.status(400).json('Error deleting trip')
  }
}

module.exports = {
  getTrips,
  getTripById,
  postTrip,
  putTrip,
  deleteTrip,
  getTripsAdmin
}
