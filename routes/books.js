const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')

const imageMimeTypes = ['image/png', 'image/jpeg', 'image/gif']


// All Books Route
router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    try {
        const books = await query.exec()
        const params = {
            books: books,
            searchOptions: req.query
        }
        res.render('books/index', params)
    } catch {
        res.redirect('/')
    }
})

// New Books Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// Create Book Router
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
    })
    saveCover(book, req.body.cover)
    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch {
        renderNewPage(res, book, true)
    }
})

async function renderFormPage(res, book, form, hasError) {
    try {
        const authors = await Author.find({})
        const params = { authors:authors, book:book}
        if (hasError) {
            (form === 'new')
                ? params.errorMessage = 'Error Creating Book'
                : params.errorMessage = 'Error Editing Book'
        }
        res.render(`books/${form}`, params)
    } catch {
        res.redirect('books')
    }
}

async function renderNewPage(res, book, hasError = false){
    renderFormPage(res, book, 'new', hasError)
}

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

// Show Book Router
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
                                .populate('author')
                                .exec()
        res.render('books/show',{
            book: book
        })
    } catch {
        res.redirect('/')
    }
})

// Edit Book Router
router.get('/:id/edit', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).exec()
        renderEditPage(res, book)
    } catch {
        res.redirect('/')
    }
})

async function renderEditPage(res, book, hasError = false) {
    renderFormPage(res, book, 'edit', hasError)
}

// Update Book Router
router.put('/:id', async (req, res) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        book.title = req.body.title
        book.author = req.body.author
        book.publishDate = new Date(req.body.publishDate)
        book.pageCount = req.body.pageCount
        book.description = req.body.description
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(book, req.body.cover)
        }
        await book.save()
        res.redirect(`books`)
    } catch (err) {
        console.error(err)
        if (book != null) {
            renderEditPage(res, book, true)
        } else {
            res.redirect('/')
        }
    }
})

// Delete Book Router
router.delete('/:id', async (req, res) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect('/books')
    } catch {
        if (book == null) {
            res.redirect('/')
        }
        res.redirect(`/books/${book.id}`)
    }
})

module.exports = router