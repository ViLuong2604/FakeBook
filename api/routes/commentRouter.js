const router = require('express').Router();
const Comments = require('../models/Comments')

// create comment
router.post('/', async (req,res)=>{
  
    const comment = new Comments({
        body : req.body.body,
        userid : req.body.userid,
        parenid : req.body.parenid,
        postId : req.body.postId
      })
       comment.save()
      
       .then( newcomment => res.status(200).json(newcomment) )
      .catch(err => res.status(500).json(err));
} )
// get comment
router.get('/:id',async (req,res)=>{
    try {
       const comments  =await Comments.find({postId :  req.params.id})
           
           res.status(200).json(comments)
           } catch (error) {
           res.status(500).json(error)
           }     
   } )
// delete comment
router.delete('/:id',async (req,res)=>{
    try {
       await  Comments.findByIdAndDelete({_id : req.params.id})
           
           res.status(200).json('delete successfully ...')
           } catch (error) {
           res.status(500).json(error)
           }     
   } )
// update comment
router.put('/:id',async(req,res)=>{
    try {
        const newComment = await Comments.findByIdAndUpdate(req.params.id, 
          {
            body : req.body.body
          },{new : true})
           
           res.status(200).json(newComment)
           } catch (error) {
           res.status(500).json(error)
           }     
   })
module.exports = router