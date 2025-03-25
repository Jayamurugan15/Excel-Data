const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyOtp:{type:String,default:""},
    verifyOtpExpireAt:{type:Number,default:0},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false}
}, {timestamps:true} );

const UserModel =mongoose.models.userDetails || mongoose.model('userDetails',userSchema);

module.exports= UserModel;
