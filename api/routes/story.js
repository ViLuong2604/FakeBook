const router = require('express').Router();
const Story = require('../models/Story')
const User = require('../models/User')
// create story
router.post("/",async (req,res)=>{
      const newStory = new Story(req.body);
      try {
           const saveStory = await newStory.save();
           res.status(200).json(saveStory)
      } catch (error) {
        res.status(500).json(error)
      }

})
// get story
router.get("/:id",async (req,res)=>{
    
    try {
         const getStory = await Story.find({
             _id : req.params.id
         });
         res.status(200).json(getStory)
    } catch (error) {
      res.status(500).json(error)
    }

})
// get all story story
router.get("/",async (req,res)=>{ 
    try {
         const getStorys = await Story.find();
         const id =[];
         const result = [];
            getStorys.forEach( s => {
              if (!id.includes(s.userId)) {
                result.push(s);
                id.push(s.userId);
              }
            }   )
           
         res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }

})
//get  user up story
router.get("/userStory/:userId" ,async (req, res) => {
  try {

     const user = await User.findOne({_id : req.params.userId});
     const userFollowings =  [...user.followings , req.params.userId];
     
     const userStory = await Story.find({userId : {$in : userFollowings}})
     const userIds = [];
     userStory.forEach( u =>  !userIds.includes(u.userId) && userIds.push(u.userId) );
    
     const users = await User.find({_id : {$in : userIds}})
     res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get story with userid
router.get("/storys/:userId" ,async (req, res) => {
  try {
        
     const userStory = await Story.find({userId : req.params.userId})

     res.status(200).json(userStory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//thêm emoji
router.put("/emoji" ,async (req, res) => {
  try {
        
     await Story.findByIdAndUpdate(req.body.id,{
     $push :{ emoji  : req.body.emoji}
     })

     res.status(200).json('emoji success...');
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;