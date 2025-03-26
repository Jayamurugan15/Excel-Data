const XLSX  = require('xlsx')
const ExcelData = require('../Models/ExcelData.js');

const UploadFile = async(req,res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

       
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        if(workbook.SheetNames.length  === 0){
            return res.status(400).json({success:false,message:"Excel file is empty"})
        }
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const newFile = new ExcelData({ 
            filename: req.file.originalname, 
            data: sheetData
         });
        await newFile.save();

        res.json({ success: true, message: "File uploaded successfully", rowCount: sheetData.length });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const FetchData = async(req,res) => {
    try {
        const latestFile = await ExcelData.findOne().sort({_id:-1});
        if(!latestFile){
            return res.status(404).json({
                success:false,
                message:"No data found"
            });
       
        }
        res.json(latestFile.data);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    UploadFile,
    FetchData
}