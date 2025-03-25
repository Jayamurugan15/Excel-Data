const  mongoose =  require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

 const connectDB = async()=>{
    try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Connected to MongoDB')
        } 
        catch (err) {
            console.log({message:err});
            process.exit(1);
        }
    };

  module.exports = connectDB;
 
