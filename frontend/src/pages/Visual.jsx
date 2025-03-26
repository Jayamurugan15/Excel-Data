import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload.jsx';
import ChartDisplay from '../components/ChartDisplay.jsx';

const Visual= () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileDataLoaded = (data) => {
    if (data && data.length > 0) {
      setFileData(data);
    }
  };

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    setSelectedFile(null);
  };

  useEffect(() => {
    if (fileData) {
      setUploadSuccess(false);
    }
  }, [fileData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-blue-100">
      <h1 className="text-xl md:text-3xl text-start  font-bold md:text-center text-gray-800 mb-8">Excel Data Visualization</h1>
    
      
      <div className="flex flex-col  gap-3">
      <div className="bg-white rounded-lg shadow-md w-100 md:w-160 p-4 mx-auto ">
          <h2 className="text-sm md:text-xl md:text-center font-semibold text-gray-700 mb-4">Upload Excel File</h2>
          <FileUpload 
            onUploadSuccess={handleUploadSuccess} 
            onFileDataLoaded={handleFileDataLoaded} 
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Data Visualization</h2>
          {fileData ? (
            <ChartDisplay data={fileData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-center p-6">
              <div className="max-w-md">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="text-lg font-medium">No Data to Visualize</p>
                <p className="mt-2">Upload an Excel file to see data visualizations.</p>
              </div>
            </div>
          )}
        </div>
        
        
      </div>
    </div>
  );
}

export default Visual;