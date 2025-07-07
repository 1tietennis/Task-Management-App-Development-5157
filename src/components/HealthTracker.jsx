import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../context/HealthContext';
import HealthDashboard from './health/HealthDashboard';
import StepsTracker from './health/StepsTracker';
import WeightTracker from './health/WeightTracker';
import FitnessGoals from './health/FitnessGoals';
import HealthInsights from './health/HealthInsights';

const { FiActivity, FiTarget, FiTrendingUp, FiHeart, FiBarChart3 } = FiIcons;

const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { getHealthStats } = useHealth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiActivity },
    { id: 'steps', label: 'Steps', icon: FiTarget },
    { id: 'weight', label: 'Weight', icon: FiTrendingUp },
    { id: 'goals', label: 'Goals', icon: FiHeart },
    { id: 'insights', label: 'Insights', icon: FiBarChart3 }
  ];

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Tracker</h1>
            <p className="text-gray-600 mt-1">Monitor your health and fitness goals</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Android Health Connected
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

export default HealthTracker;