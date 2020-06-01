const Handlebars = require('handlebars')
const connectMongo = require('connect-mongo')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')


const app = express()

const port = 3000

const hostname = '127.0.0.1'

app.use(express.static('public'))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1/20GagDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(fileUpload())

app.engine("handlebars", expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set("view engine", "handlebars")

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
  secret: 'testotesto',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: false
    }
  } else {
    res.locals = {
      displayLink: true
    }
  }
  next()
})

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const gonderi = require('./routes/gonderi_sayfasi')
const admin = require('./routes/admin/index')
const settings = require('./routes/settings')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/gonderi_sayfasi', gonderi)
app.use('/admin', admin)
app.use('/settings',settings)

app.listen(port, hostname, () => {
  console.log(`Server çalışıyor,   http://${hostname}:${port}/`)
})