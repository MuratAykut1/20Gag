const express = require('express')
const router = express.Router()
const User = require('../models/User')
const path = require('path')


router.get('/', (req, res) => {
    User.findById(req.session.userId).then(user => {
        res.render('site2/settings', { user: user })
    })
})

router.put('/changePassword/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).then(user => {
        user.password = req.body.password

        user.save().then(
            res.redirect('/settings')
        )
    })
})

router.post('/editProfil/:id', (req, res) => {
    let Avatar = req.files.avatar
    Avatar.mv(path.resolve(__dirname, '../public/img/avatarimages', Avatar.name))

    User.findOne({ _id: req.params.id }).then(user => {
        user.avatar = `/img/avatarimages/${Avatar.name}`
        user.country = req.body.country
        user.dogumTarihiYil = req.body.dogumTarihiYil
        user.dogumTarihiAy = req.body.dogumTarihiAy
        user.dogumTarihiGun = req.body.dogumTarihiGun
        user.Hometown = req.body.Hometown

        user.save().then(
            res.redirect('/settings')
        )
    })
})


module.exports = router