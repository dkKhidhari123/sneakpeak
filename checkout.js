const mongoose = require('mongoose');

//creating a schema

const checkoutSchema =({
    name:{
        type:String,
        require:true
    },
   phone: {
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    }
});

// creating  to collection
const checkout = new mongoose.model("checkout",checkoutSchema);
module.exports = checkout;