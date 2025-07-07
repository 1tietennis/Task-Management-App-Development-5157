import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BibleContext = createContext();

const initialState = {
  studies: [],
  notes: [],
  videos: [],
  recordings: [],
  mindMaps: [],
  loading: false
};

const bibleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDIES':
      return { ...state, studies: action.payload };
    case 'ADD_STUDY':
      return { ...state, studies: [...state.studies, action.payload] };
    case 'UPDATE_STUDY':
      return {
        ...state,
        studies: state.studies.map(study =>
          study.id === action.payload.id ? action.payload : study
        )
      };
    case 'DELETE_STUDY':
      return {
        ...state,
        studies: state.studies.filter(study => study.id !== action.payload)
      };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'ADD_VIDEO':
      return { ...state, videos: [...state.videos, action.payload] };
    case 'ADD_RECORDING':
      return { ...state, recordings: [...state.recordings, action.payload] };
    case 'ADD_MINDMAP':
      return { ...state, mindMaps: [...state.mindMaps, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const BibleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bibleReducer, initialState);

  useEffect(() => {
    const savedBibleData = localStorage.getItem('bibleData');
    if (savedBibleData) {
      const data = JSON.parse(savedBibleData);
      dispatch({ type: 'SET_STUDIES', payload: data.studies || [] });
    }
  }, []);

  useEffect(() => {
    const bibleData = {
      studies: state.studies,
      notes: state.notes,
      videos: state.videos,
      recordings: state.recordings,
      mindMaps: state.mindMaps
    };
    localStorage.setItem('bibleData', JSON.stringify(bibleData));
  }, [state.studies, state.notes, state.videos, state.recordings, state.mindMaps]);

  const addStudy = (study) => {
    const newStudy = {
      ...study,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    dispatch({ type: 'ADD_STUDY', payload: newStudy });
  };

  const updateStudy = (study) => {
    dispatch({ type: 'UPDATE_STUDY', payload: study });
  };

  const deleteStudy = (id) => {
    dispatch({ type: 'DELETE_STUDY', payload: id });
  };

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
  };

  const addVideo = (video) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      savedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_VIDEO', payload: newVideo });
  };

  const addRecording = (recording) => {
    const newRecording = {
      ...recording,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_RECORDING', payload: newRecording });
  };

  const addMindMap = (mindMap) => {
    const newMindMap = {
      ...mindMap,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_MINDMAP', payload: newMindMap });
  };

  const getStudyStats = () => {
    const totalStudies = state.studies.length;
    const totalNotes = state.notes.length;
    const totalVideos = state.videos.length;
    const totalRecordings = state.recordings.length;
    
    return { totalStudies, totalNotes, totalVideos, totalRecordings };
  };

  const value = {
    ...state,
    addStudy,
    updateStudy,
    deleteStudy,
    addNote,
    addVideo,
    addRecording,
    addMindMap,
    getStudyStats
  };

  return (
    <BibleContext.Provider value={value}>
      {children}
    </BibleContext.Provider>
  );
};

export const useBible = () => {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  return context;
};