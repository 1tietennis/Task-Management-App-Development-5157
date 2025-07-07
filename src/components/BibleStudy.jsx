import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBible } from '../context/BibleContext';
import StudyDashboard from './bible/StudyDashboard';
import AIStudyAssistant from './bible/AIStudyAssistant';
import VideoLibrary from './bible/VideoLibrary';
import StudyNotes from './bible/StudyNotes';
import VoiceRecorder from './bible/VoiceRecorder';
import MindMap from './bible/MindMap';

const { FiBook, FiVideo, FiMic, FiMap, FiFileText, FiBot, FiSearch } = FiIcons;

const BibleStudy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { studies, getStudyStats } = useBible();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBook },
    { id: 'ai-assistant', label: 'AI Assistant', icon: FiBot },
    { id: 'videos', label: 'Video Library', icon: FiVideo },
    { id: 'notes', label: 'Study Notes', icon: FiFileText },
    { id: 'voice', label: 'Voice Recorder', icon: FiMic },
    { id: 'mindmap', label: 'Mind Maps', icon: FiMap }
  ];

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bible Study</h1>
            <p className="text-gray-600 mt-1">AI-powered Bible study with mind mapping and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search verses, notes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BibleStudy;