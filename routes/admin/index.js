const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = require('path')

router.get('/', (req, res) => {
    res.render('site2/admin')
})

router.get('/posts', (req, res) => {
    Post.find({}).populate({ path: 'category', model: Category }).sort({ $natural: -1 }).then(posts => {

        res.render('site2/posts', { post: posts })

    })
})

router.get('/categories', (req, res) => {
    Category.find({}).then(categories => {
        res.render('site2/categories', { categories: categories })
    })
})

router.post('/categories', (req, res) => {
    Category.create(req.body, (error, category) => {
        if (!error) {
            res.redirect('categories')
        }
    })
})

router.delete('/categories/:id', (req, res) => {

    Category.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/categories')
    })

})

router.delete('/posts/:id', (req, res) => {

    Post.remove({_id: req.params.id}).then(() => {
        res.redirect('/admin/posts')
    })

})

router.get('/posts/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).then(post => {
        Category.find({}).then(categories =>{
            res.render('site2/editpost', {post:post, categories:categories})
        })
    })
    
})

router.put('/posts/:id', (req,res) =>{
    let postImage = req.files.postImage  
    postImage.mv(path.resolve(__dirname, '../../public/img/postimages', postImage.name))

    Post.findOne({_id: req.params.id}).then(post =>{
        post.definition = req.body.definition
        post.date = req.body.date
        post.category = req.body.category
        post.postImage = `/img/postimages/${postImage.name}`

        post.save().then(
            res.redirect('/admin/posts')
        )
    })

})

module.exports = router