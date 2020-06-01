const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')
const mongoose = require('mongoose')


router.get('/new', (req, res) => {
    if (!req.session.userId) {
        res.redirect('users/login')
    } else {
        Category.find({}).then(categories => {
            res.render('site2/addpost', { categories: categories })
        })
    }
})

router.get('/category/:categoryId', (req, res) => {
    Post.find({ category: req.params.categoryId }).populate({ path: 'category', model: Category }).then(post => {
        Category.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1
                }
            }
        ]).then(categories => {
            res.render('site2/index', { post: post, categories: categories })
        })
    })
    console.log(req.params.categoryId)
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.render('site2/index', { post: post, categories: categories })
    })
})

router.post('/test', (req, res) => {

    let post_image = req.files.postImage

    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))



    Post.create({
        ...req.body,
        postImage: `/img/postimages/${post_image.name}`,
        user: req.session.userId,
       
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }

    res.redirect('/')
})


module.exports = router