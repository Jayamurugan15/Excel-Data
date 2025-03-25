const Usermodel = require( "../Models/UserModel.js");
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');

const Transporter =  require('../config/nodeMailer.js')


//Register  new User :
 const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.json({message:"Missing Data"})
        }

        const userexist = await Usermodel.findOne({email});

        if(userexist){
            return res.json({message:"User already exist"});
        }

        const hashpassword = await bcrypt.hash(password, 10);
       
        const user = new Usermodel({
            name,
            email,
            password:hashpassword,
        });

        await user.save();
        const token = jwt.sign({id:user._id },process.env.JWT_SECRETKEY,{expiresIn:"7d"});
       
        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })
        const mailOption = {
                        from: process.env.SMTP_USER,
                        to:email,
                        subject: 'Welcome to our website',
                        text: `Your account has been created using  Gmail: ${email}`
                    };
            
        await Transporter.sendMail(mailOption);

        return res.status(200).json({message:"User Registration successfull.",token})
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}



const login = async(req,res) =>{

try {
    const { email,password } = req.body;

    const user = await Usermodel.findOne({email});

    if(!user){
      return  res.json({message:"Invalid email"});
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
       return res.status(400).json({message:"Invalid password"});
    }

    const token = jwt.sign({id:user._id },process.env.JWT_SECRETKEY,{expiresIn:"7d"});
       
    res.cookie('token',token,{
        httpOnly:true,
        secure: "development",
        sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
        maxAge: 7*24*60*60*1000
    });

    
    
    return res.json({success:true,message:"User LoggedIn successfully",user});

   } catch (error) {
        res.status(500).json({message:error.message})
   } 
};


//Sent Emailverify OTP :
const sendVerifyOtp = async (req,res) => {
    try {
        const {userId} = req.body;
       
        const user = await Usermodel.findById(userId);
        if(!user){
            return res.json({message:"User not found"})
        }

        if(user.isAccountVerified){
            return res.json({message:"Account already Verified"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();
        const mailOption = {
            from: process.env.SMTP_USER,
            to:user.email,
            subject: 'Account verification OTP',
            text: `Your account Verification OTP: ${otp}`,
            
        };
await Transporter.sendMail(mailOption);

return res.status(200).json({ success: true, message: 'OTP sent successfully.' });

    } catch (error) {
        return res.json({message:error.message});
    }
};


//Verify Email usin OTP :
const verifyEmail  = async (req,res) => {

    try {
        const {userId,otp} = req.body;

        if(!userId || !otp){
            return res.json({message:"Missing details"})
        }
        const user = await Usermodel.findById(userId);

        if(!user){
            return res.json({message:"User nottttt found"});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({mesage:"Invalid OTP"});
        }

        if(user.verifyOtpExpireAt < Date.now() ){
            return res.json({message:"OTP Expired"});
        }

        user.isAccountVerified =true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt= 0;

        await user.save();
        return res.json({success:true,message:"Email verified successfully"});
    } catch (error) {
        return res.json({message:error.message});
    }
};



//User loggedin or not
const isAuthenticated = async (req,res) => {
    try {
        return res.json({message:" user Authenticated"});
    } catch (error) {
        return res.json({message:error.message});
    }
}


//User Profile :
const myProfile = async(req,res)=>{
    try {
        const {userId} = req.body;
        const user = await Usermodel.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        return res.json({user});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Send OTP for Reset Password
const resetOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Invalid Email!" });
        }

        const user = await Usermodel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Password Reset OTP',
            text: `Your password reset OTP is: ${otp}\nThis OTP will expire in 15 minutes.`
        };

        await Transporter.sendMail(mailOption);

        return res.status(200).json({ success: true, message: "Reset OTP sent successfully." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//verify reset password OTP
const resetOtpVerify = async (req,res) => {
    const {email,otp} = req.body ;

    if(!email || !otp){
        return res.json({message:"Missing Data"});
    }

    try {
        const user = await Usermodel.findOne({email});

        if(!user){
            return res.json({message:"User not found"});
        }

        if(user.resetOtp === "" || user.resetOtp !== otp ){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.resetOtp === otp ){
            return res.json({success:true,message:"correct OTP"});
        }

        if(user.resetOtpExpireAt < Date.now() ){
            return res.json({message:"OTP Expired"})
        };

        user.resetOtp = "";
        user.resetOtpExpireAt=0;
    } catch (error) {
        
    }
}


//Reset password using resetOTP :
const resetPassword = async (req,res) => {
    
    const {email,newpassword} = req.body;
 
    if(!email || !newpassword){
        return res.json({message:"Missing Data"});
    }

    try {
        const user = await Usermodel.findOne({email});

        if(!user){
            return res.json({message:"Invalid User"});
        }

        const hashpassword =await bcrypt.hash(newpassword,10);
        user.password= hashpassword;

        await user.save();
        return res.json({success:true,message:"Password changed successfully"})
    } catch (error) {
        return res.json({message:error.message});
    }
}



const logout = async (req,res) =>{
    try {
        res.clearCookie('token',{   
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.status(201).json({success:true,message:"Logged Out"});

    } catch (error) {
        res.status(500).json({message:error.messag})
    };

};

module.exports = {
    register, login, logout,verifyEmail,sendVerifyOtp,resetOTP,resetOtpVerify,resetPassword, isAuthenticated ,myProfile
}