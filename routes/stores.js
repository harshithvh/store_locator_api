const express = require('express')
const router = express.Router()
const Store = require('../models/store')

// Get all stores
router.get('/', async (req, res) => {
    try{
        const stores = await Store.find()

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
})

// Create a store
router.post('/', async (req, res) => {
    try {
        const store = await Store.create(req.body)

        return res.status(200).json({
            success: true,
            data: store
        })
    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' }) // 400 is a user error if same storeid is sent
        }
        res.status(500).json({ error: 'Server error'})
    }
})

module.exports = router
