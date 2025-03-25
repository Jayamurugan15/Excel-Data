const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    data: Object
});


module.exports = mongoose.model('ExcelData',fileSchema);

