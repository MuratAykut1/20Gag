const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')


router.get('/', (req,res) =>{
    Post.find({}).sort({$natural:-1}).then(posts =>{
        Category.find({}).then(categories => {
            res.render('site2/index', {post:posts, categories:categories} )
        })
    })
})

router.get('/profil', (req, res) => {
    res.render('site2/profil')
})

module.exports = router