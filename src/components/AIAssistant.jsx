import React, {useState} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useAI} from '../context/AIContext';
import ChatInterface from './ai/ChatInterface';
import ProjectInsights from './ai/ProjectInsights';
import TaskSuggestions from './ai/TaskSuggestions';
import LifeInsights from './ai/LifeInsights';
import toast from 'react-hot-toast';

const {FiBot, FiMessageCircle, FiTrendingUp, FiTarget, FiHeart, FiZap, FiSettings} = FiIcons;

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [aiStatus, setAiStatus] = useState('online');
  const {conversations, getAIStats, insights, suggestions} = useAI();
  
  const stats = getAIStats();

  const tabs = [
    {id: 'chat', label: 'AI Chat', icon: FiMessageCircle},
    {id: 'projects', label: 'Project Insights', icon: FiTrendingUp},
    {id: 'tasks', label: 'Task Suggestions', icon: FiTarget},
    {id: 'life', label: 'Life Insights', icon: FiHeart}
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
  };

  const toggleAIStatus = () => {
    setAiStatus(prev => prev === 'online' ? 'offline' : 'online');
    toast.success(`AI Assistant ${aiStatus === 'online' ? 'disabled' : 'enabled'}`);
  };

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
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-gray-600 mt-1">Your intelligent life management companion</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleAIStatus}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors ${
                aiStatus === 'online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <SafeIcon icon={FiBot} className="w-4 h-4" />
              <span>AI {aiStatus === 'online' ? 'Online' : 'Offline'}</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversations</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalConversations}</p>
              </div>
              <div className="bg-indigo-500 p-3 rounded-lg">
                <SafeIcon icon={FiMessageCircle} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalMessages}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <SafeIcon icon={FiBot} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Insights</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{insights.length}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suggestions</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{suggestions.length}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
              </div>
            </div>
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
          initial={{opacity: 0, x: 20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.3}}
        >
          {aiStatus === 'online' ? (
            renderContent()
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <SafeIcon icon={FiBot} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Assistant Offline</h3>
              <p className="text-gray-600 mb-6">
                Enable the AI Assistant to access intelligent insights and suggestions.
              </p>
              <button
                onClick={toggleAIStatus}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Enable AI Assistant
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIAssistant;