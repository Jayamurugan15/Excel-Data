import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Appcontent } from '../context/AppContext';
import { useContext } from 'react';


const FileUpload = ({ onUploadSuccess, onFileDataLoaded }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const {backendurl} = useContext(Appcontent);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if(!file){
      setMessage('Please select a file');
      return;
    }
    
    const formData = new FormData();
    formData.append('File', file);
    
    
    try {
      const uploadResponse = await axios.post(backendurl+'/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(uploadResponse.data.success){
        const dataResponse = await axios.post( backendurl +'/api/get-data');
        
        if (onFileDataLoaded) {
          onFileDataLoaded(dataResponse.data);
        }
        
        onUploadSuccess();
        
        // setMessage(`Success! Uploaded ${uploadResponse.data.rowCount} rows of data`);
        setMessage("File Uploaded")
        
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading file');
    }
  };

  const resetFileSelection = () => {
    setFile(null);
    setMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-50 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-4 pb-6">
            <svg className="w-5 h-5 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
            <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange} 
            ref={fileInputRef}
          />
        </label>
      </div>
      
      {file && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
            <button 
              onClick={resetFileSelection}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      {message && (
        <p className="mt-2 text-sm text-center text-green-600">
          {message}
        </p>
      )}
      
      <button 
        className=" w-50 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        onClick={handleUpload}
        disabled={!file}
      >
      Upload File
      </button>
    </div>
  );
}

export default FileUpload;