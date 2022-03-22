const router = require("express").Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  // const value =await Conversation.find({ members: { $eq: [req.body.senderId, req.body.receiverId] } } )
  const value =await Conversation.find({ $or: [ { members: { $eq: [req.body.senderId, req.body.receiverId] } }, { members: { $eq: [req.body.receiverId, req.body.senderId] } }]})
  console.log(value)
  if(value.length === 0){
  try {
    const savedConversation = await newConversation.save();
    console.log(savedConversation)
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
}
else{
  res.status(500).json({message : "not valid"});
}
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

//get  conv of followers and followings

router.get("/find/:userid",async(req,res) =>{
  try {
    const userData = await User.findById(req.params.userid)
    const followersId = userData.followers
    console.log(followersId);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
