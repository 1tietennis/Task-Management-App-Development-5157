import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useFile } from '../context/FileContext';
import toast from 'react-hot-toast';

const { FiFolder, FiFile, FiUpload, FiDownload, FiTrash2, FiCloud, FiHardDrive } = FiIcons;

const FileManager = () => {
  const { files, folders, googleDriveConnected, addFile, deleteFile, connectGoogleDrive, getFileStats } = useFile();
  const [view, setView] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  
  const stats = getFileStats();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      addFile({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    });
    toast.success(`${files.length} file(s) uploaded successfully!`);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      addFile({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    });
    toast.success(`${files.length} file(s) uploaded successfully!`);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return FiFile;
    if (type?.startsWith('video/')) return FiFile;
    if (type?.startsWith('audio/')) return FiFile;
    return FiFile;
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;
    
    if (window.confirm(`Delete ${selectedFiles.length} file(s)?`)) {
      selectedFiles.forEach(fileId => deleteFile(fileId));
      setSelectedFiles([]);
      toast.success('Files deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
            <p className="text-gray-600 mt-1">Organize your files with Google Drive integration</p>
          </div>
          <div className="flex items-center space-x-3">
            {!googleDriveConnected && (
              <button
                onClick={connectGoogleDrive}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <SafeIcon icon={FiCloud} className="w-5 h-5" />
                <span>Connect Google Drive</span>
              </button>
            )}
            {selectedFiles.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                <span>Delete ({selectedFiles.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalFiles}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <SafeIcon icon={FiFile} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{formatFileSize(stats.totalSize)}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <SafeIcon icon={FiHardDrive} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Folders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalFolders}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <SafeIcon icon={FiFolder} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cloud Status</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {googleDriveConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              <div className={`${googleDriveConnected ? 'bg-green-500' : 'bg-gray-500'} p-3 rounded-lg`}>
                <SafeIcon icon={FiCloud} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input 
              id="file-input"
              type="file" 
              multiple 
              onChange={handleFileInput}
              className="hidden"
            />
            <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : 'Upload files'}
            </h3>
            <p className="text-gray-600">
              Drag and drop files here, or click to select files
            </p>
          </div>
        </div>

        {/* Files Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Files</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {files.length > 0 ? (
            <div className={`${
              view === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
                : 'space-y-2'
            }`}>
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedFiles.includes(file.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${view === 'list' ? 'flex items-center justify-between' : ''}`}
                >
                  <div className={`${view === 'list' ? 'flex items-center space-x-3' : 'text-center'}`}>
                    <SafeIcon 
                      icon={getFileIcon(file.type)} 
                      className={`w-8 h-8 text-gray-400 ${view === 'grid' ? 'mx-auto mb-2' : ''}`} 
                    />
                    <div className={view === 'list' ? 'flex-1' : ''}>
                      <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                      <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  {view === 'list' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success('Download feature coming soon!');
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(file.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SafeIcon icon={FiFolder} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
              <p className="text-gray-600">Upload your first file to get started</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FileManager;