const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB  = require('./config/Mongodb.js');
const authRoutes =  require('./Routes/authRoutes.js');
const router = require('./routes/fileUpload.js');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
 
connectDB();

const allowOrigin = ['http://localhost:5173']
app.use(cors(
    {
        origin:allowOrigin,
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//API Endpoints :
app.get('/',(req,res)=>res.send("Server Running"));
app.use('/api/user',authRoutes);
app.use('/api',router)


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});
