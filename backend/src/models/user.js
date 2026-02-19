import mongo from "mongoose";

const userSchema=mongo.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },

     creditsUsed: {
  type: Number,
  default: 0,
},
creditLimit: {
  type: Number,
  default: 400 * 1024 * 1024,  
},


})

export default mongo.model("User",userSchema); 