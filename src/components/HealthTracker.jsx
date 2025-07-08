import React, {useState} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useHealth} from '../context/HealthContext';
import HealthDashboard from './health/HealthDashboard';
import StepsTracker from './health/StepsTracker';
import WeightTracker from './health/WeightTracker';
import FitnessGoals from './health/FitnessGoals';
import HealthInsights from './health/HealthInsights';
import toast from 'react-hot-toast';

const {FiActivity, FiTarget, FiTrendingUp, FiHeart, FiBarChart3, FiSettings, FiPlus, FiSmartphone} = FiIcons;

const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [syncStatus, setSyncStatus] = useState('connected');
  const {getHealthStats, addStepsData, addWeightData} = useHealth();
  
  const stats = getHealthStats();

  const tabs = [
    {id: 'dashboard', label: 'Dashboard', icon: FiActivity},
    {id: 'steps', label: 'Steps', icon: FiTarget},
    {id: 'weight', label: 'Weight', icon: FiTrendingUp},
    {id: 'goals', label: 'Goals', icon: FiHeart},
    {id: 'insights', label: 'Insights', icon: FiBarChart3}
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    toast.success(`Switched to ${tabs.find(t => t.id === tabId)?.label}`);
  };

  const handleSyncToggle = () => {
    setSyncStatus(prev => prev === 'connected' ? 'disconnected' : 'connected');
    toast.success(`Android Health ${syncStatus === 'connected' ? 'disconnected' : 'connected'}`);
  };

  const handleQuickLog = () => {
    const today = new Date().toISOString().split('T')[0];
    addStepsData({
      date: today,
      count: Math.floor(Math.random() * 5000) + 5000,
      goal: 10000
    });
    toast.success('Quick health data logged!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HealthDashboard />;
      case 'steps':
        return <StepsTracker />;
      case 'weight':
        return <WeightTracker />;
      case 'goals':
        return <FitnessGoals />;
      case 'insights':
        return <HealthInsights />;
      default:
        return <HealthDashboard />;
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
            <h1 className="text-3xl font-bold text-gray-900">Health Tracker</h1>
            <p className="text-gray-600 mt-1">Monitor your health and fitness goals</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleQuickLog}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Quick Log</span>
            </button>
            <button
              onClick={handleSyncToggle}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors ${
                syncStatus === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <SafeIcon icon={FiSmartphone} className="w-4 h-4" />
              <span>Health {syncStatus === 'connected' ? 'Connected' : 'Disconnected'}</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Health Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Steps</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.todaySteps.toLocaleString()}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <SafeIcon icon={FiActivity} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Weight</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.currentWeight ? `${stats.currentWeight}kg` : 'N/A'}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeGoals}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <SafeIcon icon={FiTarget} className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Goals</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalGoals}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-lg">
                <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
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
                    ? 'bg-green-100 text-green-700'
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
          {syncStatus === 'connected' ? (
            renderContent()
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <SafeIcon icon={FiSmartphone} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Health Sync Disconnected</h3>
              <p className="text-gray-600 mb-6">
                Connect to Android Health to sync your fitness data automatically.
              </p>
              <button
                onClick={handleSyncToggle}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Connect Android Health
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HealthTracker;