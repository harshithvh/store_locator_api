const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')
// Visit: https://mongoosejs.com/docs/geojson.html to get the syntax for location field

// In the frontend we are providing only the storeId and address, location is created in the middleware function 'pre'
const storeSchema = mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true, // trim any white spaces
        maxlength: [10, 'Store ID must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    }, // we just need to add the address in the frontend and the geocoder will convert it into the location below, there is no need to enter lat or long
    // The syntax for location comes from the above URL (geojson)
    location: {
        type: {
          type: String, 
          enum: ['Point'], // the only values that are allowed is geojson point
        },
        coordinates: {
          type: [Number], // Number array
          index: '2dsphere' // 2dsphere supports queries that calculate geometries on earth like sphere
        },
        formattedAdress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    } // In the database we are storing the location instead of address containing full info

})

// Geocode and create location - middleware
storeSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAdress: loc[0].formattedAddress
    }

    // Do not save address to database
    this.address = undefined
    next()
})

module.exports = mongoose.model('store', storeSchema)