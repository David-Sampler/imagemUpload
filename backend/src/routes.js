const routes = require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer')
const Post = require('./models/post')


routes.get('/posts',async(req,res)=>{
  const post = await Post.find()
  return res.json(post)
})

routes.post('/posts',multer(multerConfig).single('file'), async (req,res)=>{
   
    const {originalname:name, size, key, location:url = ""} = req.file
    const post = await Post.create({
        name,
        size,
        key,
        url
    })
    return res.json(post)
})

routes.delete('/deletePosts/:id',async(req,res)=>{
       const post = await Post.findById(req.params.id)
       await post.remove()
       return res.json({msg:"Excluido com sucess"})
})


module.exports = routes