const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Favs = require('../models/Favs')

router.get('/register', (req, res) => {
    res.render('site2/register')
})

router.post('/register', (req, res) => {
    User.create(req.body, (error, user) => {
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Başarılı bir şekilde kayıt oldunuz'
        }
        res.redirect('/users/login')
    })
})

router.get('/login', (req, res) => {
    res.render('site2/login')
})

router.post('/login', (req, res) => {
    const { userName, password } = req.body

    User.findOne({ userName }, (error, User) => {
        if (User) {
            if (User.password == password) {
                req.session.userId = User._id
                res.redirect('/')
            }
            else {
                res.redirect('/users/login')
            }
        } else {
            res.redirect('/users/register')
        }

    })
})

router.get('/search', (req, res) => {
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    if (req.query.look) {
        const regex = new RegExp(escapeRegex(req.query.look), 'gi');
        User.find({ "userName": regex }).then(userName => {
            res.render('site2/aranan_kisi', { userName: userName })
        })
    }
}
)

router.get('/profil/:id', (req, res) => {
    Post.find({ user: req.params.id }).then(posts => {
        User.find({ _id: req.params.id }).then(userName1 => {
            res.render('site2/profil', { posts: posts, userName1: userName1 })
        })
    })
})

router.get('/profil/favori/:id', (req, res) => {
    User.find({ _id: req.params.id }).then(user => {
        Favs.find({ user: req.params.id }).then(favs => {
            console.log(favs)
            res.render('site2/profil', { userName1: user, posts: favs })
        })
    })
})

router.post('/profil/favori/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {

        console.log(post.definition)
        Favs.create({
            postId: req.params.id,
            user: req.session.userId,
            definition: post.definition,
            postImage: post.postImage,
            date: post.date,
        })
    })

    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router