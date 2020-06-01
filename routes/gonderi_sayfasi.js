const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


router.get('/', (req, res) => {
    res.render('site2/gonderi_sayfasi')
})

router.get('/:id', (req,res) => {
    Post.findById(req.params.id).then(post => {
        res.render('site2/gonderi_sayfasi', {post:post})
    })
})

module.exports = router