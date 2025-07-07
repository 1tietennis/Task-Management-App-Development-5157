import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../../context/HealthContext';

const { FiActivity, FiTarget, FiTrendingUp, FiArrowRight } = FiIcons;

const HealthWidget = () => {
  const navigate = useNavigate();
  const { getHealthStats } = useHealth();
  const stats = getHealthStats();

  const healthMetrics = [
    { label: 'Steps Today', value: stats.todaySteps, target: 10000, icon: FiTarget, color: 'text-green-600' },
    { label: 'Active Goals', value: stats.activeGoals, icon: FiActivity, color: 'text-blue-600' },
    { label: 'Weight', value: stats.currentWeight ? `${stats.currentWeight}kg` : 'N/A', icon: FiTrendingUp, color: 'text-purple-600' }
  ];

  const stepsProgress = stats.todaySteps / 10000 * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Overview</h3>
        <button
          onClick={() => navigate('/health')}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Steps Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Daily Steps</span>
            <span className="text-sm font-medium text-gray-900">{stats.todaySteps}/10,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(stepsProgress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 gap-3">
          {healthMetrics.map((metric, index) => (
            <div key={metric.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={metric.icon} className={`w-5 h-5 ${metric.color}`} />
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{metric.value}</span>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <button
          onClick={() => navigate('/health')}
          className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiActivity} className="w-5 h-5" />
          <span className="font-medium">View Health Dashboard</span>
        </button>
      </div>
    </motion.div>
  );
};

export default HealthWidget;