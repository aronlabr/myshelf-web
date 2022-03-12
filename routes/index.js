const express = require('express')
const router = express.Router()

const authorsRouter = require('./authors')
const booksRouter = require('./books')

const Book = require('../models/book')

router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', {books: books})
})

router.use('/authors', authorsRouter)
router.use('/books', booksRouter)

module.exports = router