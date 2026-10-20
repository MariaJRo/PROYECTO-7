const Destination = require('../models/destinations')

const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ verified: true })
    return res.status(200).json(destinations)
  } catch (error) {
    return res.status(400).json('Error getting destinations')
  }
}

const getDestinationsAdmin = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ verified: false })
    return res.status(200).json(destinations)
  } catch (error) {
    return res.status(400).json('Error getting destinations')
  }
}

const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params
    const destination = await Destination.findById(id)
    return res.status(200).json(destination)
  } catch (error) {
    return res.status(400).json('Error getting destination')
  }
}

const getDestinationsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const destinations = await Destination.find({ category })
    return res.status(200).json(destinations)
  } catch (error) {
    return res.status(400).json('Error getting destinations by category')
  }
}

const postDestination = async (req, res, next) => {
  try {
    const newDestination = new Destination(req.body)
    if (req.user.rol === 'admin') {
      newDestination.verified = true
    } else {
      newDestination.verified = false
    }
    const destinationSaved = await newDestination.save()
    return res.status(201).json(destinationSaved)
  } catch (error) {
    return res.status(400).json('Error creating destination')
  }
}

const putDestination = async (req, res, next) => {
  try {
    const { id } = req.params
    const newDestination = new Destination(req.body)
    newDestination._id = id
    const destinationUpdated = await Destination.findByIdAndUpdate(
      id,
      newDestination,
      { new: true }
    )
    return res.status(200).json(destinationUpdated)
  } catch (error) {
    return res.status(400).json('Error updating destination')
  }
}

const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params
    const destinationDeleted = await Destination.findByIdAndDelete(id)
    return res.status(200).json(destinationDeleted)
  } catch (error) {
    return res.status(400).json('Error deleting destination')
  }
}

module.exports = {
  getDestinations,
  getDestinationsAdmin,
  getDestinationById,
  getDestinationsByCategory,
  postDestination,
  putDestination,
  deleteDestination
}
