const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    destinations: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'destinations',
        required: true
      }
    ],
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'trips' }
)

const Trip = mongoose.model('trips', tripSchema, 'trips')
module.exports = Trip
