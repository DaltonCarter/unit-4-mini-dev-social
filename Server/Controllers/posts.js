const {User} = require('../Models/user')
const {Post} = require('../Models/post')

module.exports = {
    getAllPosts: async (req, res) => {
        console.log('Aquiring target!')
        try{
            const posts = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            console.log(posts)
            res.status(200).send(posts)
        }
        catch (error) {
            console.log('error gathering all posts!')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        console.log('Target Designated!')
        try {
            const {userId} = req.params
            console.log(userId)
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]})
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        console.log('Confirmed!')
        try{
            const {title, content, status, userId} = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        }
        catch (error) {
            console.log('Error adding Post!')
            console.log(error)
            res.sendStatus(400)
        }
    },

    editPost: async (req, res) => {
        console.log('Comm Link Open!')
        try{
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}, {
                where: {id: +id}
            })
            res.sendStatus(200)
        }
        catch{(error) 
        console.log('Error in getting user Posts!')
        console.log(error)
        res.sendStatus(400)
        }
    },

    deletePost: async (req, res) => {
        console.log('Go Ahead TACCOM!')
        try {
            const {id} = req.params
        await Post.destroy({where: {id: +id}})
        res.sendStatus(200)
        }
        catch{(error)
        console.log('Error Deleting Post!')
        console.log(error)
        res.sendStatus(400)
        }
    }
}