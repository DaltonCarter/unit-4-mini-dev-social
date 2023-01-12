require(`dotenv`).config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./Controllers/posts')
const {register, login} = require('./Controllers/auth')
const {isAuthenticated} = require('./Middleware/isAuthenticated')
const {sequelize} = require('./util/database')
const {User} = require('./Models/user')
const {Post} = require('./Models/post')

const app = express()

app.use(express.json())
app.use(cors())


User.hasMany(Post)
Post.belongsTo(User)


app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Adun Toridas, we have synced with the DB, and we are listening on port ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))