import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAI } from '../../context/AIContext';

const { FiBot, FiTrendingUp, FiTarget, FiArrowRight, FiZap } = FiIcons;

const AIInsightsWidget = () => {
  const navigate = useNavigate();
  const { insights, suggestions } = useAI();

  const aiInsights = [
    {
      type: 'productivity',
      title: 'Productivity Tip',
      message: 'You complete 23% more tasks on Tuesdays. Consider scheduling important tasks then.',
      icon: FiTrendingUp,
      color: 'text-blue-600'
    },
    {
      type: 'health',
      title: 'Health Insight',
      message: 'Your step count increases by 15% when you schedule morning walks.',
      icon: FiTarget,
      color: 'text-green-600'
    },
    {
      type: 'spiritual',
      title: 'Study Suggestion',
      message: 'Based on your recent studies, consider exploring the theme of "Faith in Action".',
      icon: FiBot,
      color: 'text-purple-600'
    }
  ];

  const recentSuggestions = suggestions.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiBot} className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>
        <button
          onClick={() => navigate('/ai-assistant')}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* AI Status */}
        <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
          <SafeIcon icon={FiZap} className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-800">AI Assistant Active</p>
            <p className="text-xs text-indigo-600">Analyzing your patterns...</p>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="space-y-3">
          {aiInsights.slice(0, 2).map((insight, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={insight.icon} className={`w-5 h-5 ${insight.color} mt-0.5`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/ai-assistant')}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Ask AI
          </button>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            View All
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsightsWidget;