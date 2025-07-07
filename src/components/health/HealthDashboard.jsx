import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../../context/HealthContext';

const { FiActivity, FiTarget, FiTrendingUp, FiHeart, FiCalendar } = FiIcons;

const HealthDashboard = () => {
  const { getHealthStats } = useHealth();
  const stats = getHealthStats();

  const healthMetrics = [
    {
      title: 'Steps Today',
      value: stats.todaySteps,
      target: 10000,
      icon: FiActivity,
      color: 'bg-blue-500',
      progress: (stats.todaySteps / 10000) * 100
    },
    {
      title: 'Active Goals',
      value: stats.activeGoals,
      icon: FiTarget,
      color: 'bg-green-500'
    },
    {
      title: 'Weight',
      value: stats.currentWeight ? `${stats.currentWeight}kg` : 'N/A',
      icon: FiTrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Weekly Progress',
      value: '85%',
      icon: FiHeart,
      color: 'bg-red-500'
    }
  ];

  const weeklyData = [
    { day: 'Mon', steps: 8500, goal: 10000 },
    { day: 'Tue', steps: 9200, goal: 10000 },
    { day: 'Wed', steps: 10800, goal: 10000 },
    { day: 'Thu', steps: 7300, goal: 10000 },
    { day: 'Fri', steps: 11200, goal: 10000 },
    { day: 'Sat', steps: 9800, goal: 10000 },
    { day: 'Sun', steps: 6900, goal: 10000 }
  ];

  return (
    <div className="space-y-6">
      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6 text-white" />
              </div>
              {metric.progress && (
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(metric.progress)}%
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
            {metric.target && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Goal: {metric.target.toLocaleString()}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Weekly Steps Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Steps</h3>
        <div className="flex items-end justify-between h-48 space-x-2">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-lg mb-2 relative h-32">
                <div 
                  className={`bg-blue-500 rounded-lg transition-all duration-500 ${
                    day.steps >= day.goal ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ 
                    height: `${(day.steps / day.goal) * 100}%`,
                    minHeight: '4px'
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 font-medium">{day.day}</span>
              <span className="text-xs text-gray-500">{day.steps.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
            <h4 className="font-medium text-green-800">Great Progress!</h4>
            <p className="text-sm text-green-700 mt-1">
              You've exceeded your step goal 3 times this week. Keep up the excellent work!
            </p>
          </div>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <h4 className="font-medium text-blue-800">Consistency Tip</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your most active days are Wednesday and Friday. Try scheduling workouts on these days.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
            <h4 className="font-medium text-amber-800">Weekend Challenge</h4>
            <p className="text-sm text-amber-700 mt-1">
              Your weekend activity drops by 25%. Consider planning outdoor activities for weekends.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthDashboard;