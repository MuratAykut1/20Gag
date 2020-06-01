const mongoose = require('mongoose')

const Post = require('./models/Post')

 mongoose.connect('mongodb://127.0.0.1/20GagDB_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Post.create({
    userName : 'Ay',
    password : '12345',   
}, (error,post) => {
    console.log(error, post)
})