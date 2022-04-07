const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post('/',async (req,res)=>{
   const newConversation =new  Conversation({
       members : [req.body.senderId , req.body.receiverId]
   })
   try {
       const saveConversation = await newConversation.save();
       res.status(200).json(saveConversation)
   } catch (err) {
    res.status(500).json(err)
   }
})

//get conv of a user
router.get('/:userId',async (req,res)=>{
    
    try {
        const conv =await Conversation.find({
            members : {$in : req.params.userId}
        })
        res.status(200).json(conv)
    } catch (error) {
        res.status(500).json(error)
    }
 })
 


// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // get orther members

router.post("/member/ballons", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id : req.body.converid
    });
    
    const members = conversation.members;
    const result = members.find(m => m !== req.body.userid)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err);
  }
});
  

module.exports = router;