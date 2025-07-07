import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FileContext = createContext();

const initialState = {
  files: [],
  folders: [],
  loading: false,
  googleDriveConnected: false
};

const fileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILES':
      return { ...state, files: action.payload };
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.payload] };
    case 'DELETE_FILE':
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload)
      };
    case 'ADD_FOLDER':
      return { ...state, folders: [...state.folders, action.payload] };
    case 'SET_GOOGLE_DRIVE_STATUS':
      return { ...state, googleDriveConnected: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  useEffect(() => {
    const savedFiles = localStorage.getItem('files');
    if (savedFiles) {
      dispatch({ type: 'SET_FILES', payload: JSON.parse(savedFiles) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(state.files));
  }, [state.files]);

  const addFile = (file) => {
    const newFile = {
      ...file,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
      size: file.size || 0,
      type: file.type || 'unknown'
    };
    dispatch({ type: 'ADD_FILE', payload: newFile });
  };

  const deleteFile = (id) => {
    dispatch({ type: 'DELETE_FILE', payload: id });
  };

  const addFolder = (folder) => {
    const newFolder = {
      ...folder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      files: []
    };
    dispatch({ type: 'ADD_FOLDER', payload: newFolder });
  };

  const connectGoogleDrive = () => {
    // Mock Google Drive connection
    dispatch({ type: 'SET_GOOGLE_DRIVE_STATUS', payload: true });
  };

  const getFileStats = () => {
    const totalFiles = state.files.length;
    const totalSize = state.files.reduce((acc, file) => acc + (file.size || 0), 0);
    const totalFolders = state.folders.length;
    
    return { totalFiles, totalSize, totalFolders };
  };

  const value = {
    ...state,
    addFile,
    deleteFile,
    addFolder,
    connectGoogleDrive,
    getFileStats
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};