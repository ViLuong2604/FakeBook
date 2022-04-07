const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    userId : {type : String, required : true},
    img : {type: String,default : ""},
    text : {type : String,default : ""},
    bg : {type : String,default: ""},
    emoji : {type : Array,default: []},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);