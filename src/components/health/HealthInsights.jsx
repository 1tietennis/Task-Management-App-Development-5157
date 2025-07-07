import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiActivity, FiHeart, FiTarget, FiCalendar, FiZap } = FiIcons;

const HealthInsights = () => {
  const insights = [
    {
      title: 'Activity Patterns',
      value: '9-11 AM',
      description: 'Your most active time of day',
      icon: FiActivity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Weekly Consistency',
      value: '85%',
      description: 'Goal achievement rate',
      icon: FiTarget,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Best Day',
      value: 'Wednesday',
      description: 'Highest average activity',
      icon: FiCalendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recommendations = [
    {
      type: 'activity',
      title: 'Increase Weekend Activity',
      description: 'Your weekend steps are 30% lower than weekdays. Consider scheduling outdoor activities.',
      priority: 'medium',
      impact: 'High',
      icon: FiActivity
    },
    {
      type: 'timing',
      title: 'Morning Workout Window',
      description: 'You\'re most consistent with morning activities. Try scheduling workouts between 7-9 AM.',
      priority: 'low',
      impact: 'Medium',
      icon: FiZap
    },
    {
      type: 'goal',
      title: 'Adjust Step Goal',
      description: 'You\'ve exceeded your step goal 80% of the time. Consider increasing to 12,000 steps.',
      priority: 'high',
      impact: 'High',
      icon: FiTarget
    }
  ];

  const weeklyTrends = [
    { metric: 'Steps', trend: 'up', change: '+12%', value: '8,950 avg' },
    { metric: 'Active Minutes', trend: 'up', change: '+8%', value: '45 min avg' },
    { metric: 'Weight', trend: 'down', change: '-0.3 kg', value: '75.2 kg' },
    { metric: 'Sleep', trend: 'stable', change: '0%', value: '7.5h avg' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return FiTrendingUp;
      case 'down': return FiTrendingUp;
      default: return FiActivity;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${insight.bgColor} rounded-xl p-6 border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <SafeIcon icon={insight.icon} className={`w-6 h-6 ${insight.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</h3>
            <p className="text-sm text-gray-600">{insight.title}</p>
            <p className="text-xs text-gray-500 mt-2">{insight.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklyTrends.map((trend, index) => (
            <div key={trend.metric} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{trend.metric}</span>
                <div className="flex items-center space-x-1">
                  <SafeIcon 
                    icon={getTrendIcon(trend.trend)} 
                    className={`w-4 h-4 ${getTrendColor(trend.trend)} ${trend.trend === 'down' ? 'rotate-180' : ''}`} 
                  />
                  <span className={`text-xs font-medium ${getTrendColor(trend.trend)}`}>
                    {trend.change}
                  </span>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{trend.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Health Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <SafeIcon icon={rec.icon} className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">Impact: {rec.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Score</h3>
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - 78 / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">78</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Overall Health Score</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-600">Activity: 85</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Weight: 72</p>
            </div>
            <div>
              <p className="font-medium text-purple-600">Goals: 80</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthInsights;