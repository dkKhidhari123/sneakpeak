const mongoose = require('mongoose');

//creating a schema

const signupSchema =({
    Name:{
        type:String,
        require:true
    },
   Email: {
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
});

// creating  to collection
const collection2 = new mongoose.model("SneakPeak",signupSchema);
module.exports = collection2;