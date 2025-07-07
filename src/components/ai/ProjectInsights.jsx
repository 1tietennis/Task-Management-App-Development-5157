import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTarget, FiClock, FiAlertTriangle } = FiIcons;

const ProjectInsights = () => {
  const insights = [
    {
      title: 'Project Performance',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'On-Time Completion',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: FiTarget,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average Delay',
      value: '2.3 days',
      change: '-0.8 days',
      trend: 'down',
      icon: FiClock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recommendations = [
    {
      type: 'optimization',
      title: 'Optimize Task Distribution',
      description: 'Consider breaking down large tasks into smaller, manageable chunks to improve completion rates.',
      priority: 'high',
      icon: FiTarget
    },
    {
      type: 'timeline',
      title: 'Adjust Project Timeline',
      description: 'Based on current progress, consider extending the deadline by 3-5 days for better quality.',
      priority: 'medium',
      icon: FiClock
    },
    {
      type: 'resource',
      title: 'Resource Allocation',
      description: 'Your most productive hours are 9-11 AM. Schedule important tasks during this time.',
      priority: 'low',
      icon: FiTrendingUp
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
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
              <span className={`text-sm font-medium ${
                insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {insight.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</h3>
            <p className="text-sm text-gray-600">{insight.title}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Recommendations</h3>
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
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Timeline Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Analysis</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">Predicted Completion</h4>
              <p className="text-sm text-blue-700">Based on current progress patterns</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-900">March 15, 2024</p>
              <p className="text-sm text-blue-700">3 days ahead of schedule</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Productivity Trends</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Peak productivity: 9-11 AM</li>
                <li>• Best days: Tuesday, Wednesday</li>
                <li>• Average session: 45 minutes</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Risk Factors</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Scope creep detected</li>
                <li>• Resource constraints</li>
                <li>• External dependencies</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectInsights;