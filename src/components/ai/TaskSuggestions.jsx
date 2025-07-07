import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiClock, FiTrendingUp, FiStar, FiPlus } = FiIcons;

const TaskSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      title: 'Review project documentation',
      description: 'Based on your upcoming deadline, consider reviewing and updating project docs.',
      priority: 'high',
      estimatedTime: '30 min',
      category: 'Work',
      aiReason: 'Deadline approaching in 3 days',
      icon: FiTarget
    },
    {
      id: 2,
      title: 'Schedule team check-in',
      description: 'You haven\'t had a team meeting in 5 days. Consider scheduling a quick sync.',
      priority: 'medium',
      estimatedTime: '15 min',
      category: 'Communication',
      aiReason: 'Communication gap detected',
      icon: FiClock
    },
    {
      id: 3,
      title: 'Update health metrics',
      description: 'Log your recent workouts and weight measurements for better tracking.',
      priority: 'low',
      estimatedTime: '10 min',
      category: 'Health',
      aiReason: 'Missing data for 2 days',
      icon: FiTrendingUp
    }
  ];

  const quickTasks = [
    { title: 'Reply to pending emails', time: '5 min', category: 'Communication' },
    { title: 'Plan tomorrow\'s priorities', time: '10 min', category: 'Planning' },
    { title: 'Backup important files', time: '15 min', category: 'Maintenance' },
    { title: 'Review Bible study notes', time: '20 min', category: 'Spiritual' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Work': 'bg-blue-100 text-blue-800',
      'Communication': 'bg-purple-100 text-purple-800',
      'Health': 'bg-green-100 text-green-800',
      'Planning': 'bg-yellow-100 text-yellow-800',
      'Maintenance': 'bg-gray-100 text-gray-800',
      'Spiritual': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* AI-Generated Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">AI Task Suggestions</h3>
          <span className="text-sm text-gray-500">Based on your patterns and deadlines</span>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <SafeIcon icon={suggestion.icon} className="w-5 h-5 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(suggestion.category)}`}>
                        {suggestion.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>🤖 {suggestion.aiReason}</span>
                      <span>⏱️ {suggestion.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Add Task
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <SafeIcon icon={FiStar} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Tasks (Under 20 min)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-500">⏱️ {task.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <SafeIcon icon={FiPlus} className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Productivity Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Productivity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">68%</div>
            <div className="text-sm text-blue-700">Task Completion Rate</div>
            <div className="text-xs text-blue-600 mt-1">↑ 12% from last week</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">4.2</div>
            <div className="text-sm text-green-700">Avg Tasks per Day</div>
            <div className="text-xs text-green-600 mt-1">→ Consistent</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">2.1h</div>
            <div className="text-sm text-purple-700">Focus Time per Day</div>
            <div className="text-xs text-purple-600 mt-1">↑ 0.3h from last week</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskSuggestions;