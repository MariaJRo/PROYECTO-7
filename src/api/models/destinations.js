const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'urban',
        'coastal and island',
        'country side and rural areas',
        'resort towns'
      ]
    },
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'destinations' }
)

const Destination = mongoose.model(
  'destinations',
  destinationSchema,
  'destinations'
)

module.exports = Destination
