const express = require('express')
const router = express.Router()

const authorsRouter = require('./authors')

router.get('/', (req, res) => {
    res.render('index')
})

router.use('/authors',authorsRouter)

module.exports = router