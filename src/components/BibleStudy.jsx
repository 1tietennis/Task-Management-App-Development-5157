import React, {useState} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useBible} from '../context/BibleContext';
import StudyDashboard from './bible/StudyDashboard';
import AIStudyAssistant from './bible/AIStudyAssistant';
import VideoLibrary from './bible/VideoLibrary';
import StudyNotes from './bible/StudyNotes';
import VoiceRecorder from './bible/VoiceRecorder';
import MindMap from './bible/MindMap';
import toast from 'react-hot-toast';

const {FiBook, FiVideo, FiMic, FiMap, FiFileText, FiBot, FiSearch, FiSettings, FiPlus} = FiIcons;

const BibleStudy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const {studies, getStudyStats, addStudy} = useBible();
  
  const stats = getStudyStats();

  const tabs = [
    {id: 'dashboard', label: 'Dashboard', icon: FiBook},
    {id: 'ai-assistant', label: 'AI Assistant', icon: FiBot},
    {id: 'videos', label: 'Video Library', icon: FiVideo},
    {id: 'notes', label: 'Study Notes', icon: FiFileText},
    {id: 'voice', label: 'Voice Recorder', icon: FiMic},
    {id: 'mindmap', label: 'Mind Maps', icon: FiMap}
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
  };

  const handleQuickStudy = () => {
    const newStudy = {
      title: 'New Bible Study Session',
      description: 'Quick study session started',
      verses: [],
      notes: '',
      category: 'General'
    };
    addStudy(newStudy);
    toast.success('New study session started!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudyDashboard />;
      case 'ai-assistant':
        return <AIStudyAssistant />;
      case 'videos':
        return <VideoLibrary />;
      case 'notes':
        return <StudyNotes />;
      case 'voice':
        return <VoiceRecorder />;
      case 'mindmap':
        return <MindMap />;
      default:
        return <StudyDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bible Study</h1>
            <p className="text-gray-600 mt-1">AI-powered Bible study with mind mapping and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleQuickStudy}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Quick Study</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Studies</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStudies}</p>
              </div>
              <div className="bg-amber-500 p-3 rounded-lg">
                <SafeIcon icon={FiBook} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Notes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalNotes}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <SafeIcon icon={FiFileText} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Videos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalVideos}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-lg">
                <SafeIcon icon={FiVideo} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Voice Recordings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRecordings}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <SafeIcon icon={FiMic} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search verses, notes, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{opacity: 0, x: 20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.3}}
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BibleStudy;