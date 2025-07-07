import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAI } from '../context/AIContext';
import ChatInterface from './ai/ChatInterface';
import ProjectInsights from './ai/ProjectInsights';
import TaskSuggestions from './ai/TaskSuggestions';
import LifeInsights from './ai/LifeInsights';

const { FiBot, FiMessageCircle, FiTrendingUp, FiTarget, FiHeart } = FiIcons;

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const { conversations, getAIStats } = useAI();

  const tabs = [
    { id: 'chat', label: 'Chat', icon: FiMessageCircle },
    { id: 'projects', label: 'Project Insights', icon: FiTrendingUp },
    { id: 'tasks', label: 'Task Suggestions', icon: FiTarget },
    { id: 'life', label: 'Life Insights', icon: FiHeart }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'projects':
        return <ProjectInsights />;
      case 'tasks':
        return <TaskSuggestions />;
      case 'life':
        return <LifeInsights />;
      default:
        return <ChatInterface />;
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
            <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-gray-600 mt-1">Your intelligent life management companion</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
              <SafeIcon icon={FiBot} className="w-4 h-4" />
              <span>AI Online</span>
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
                    ? 'bg-indigo-100 text-indigo-700'
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

export default AIAssistant;