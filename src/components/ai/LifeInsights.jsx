import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiActivity, FiBook, FiTarget, FiTrendingUp, FiCalendar } = FiIcons;

const LifeInsights = () => {
  const lifeAreas = [
    {
      title: 'Work-Life Balance',
      score: 78,
      trend: 'up',
      change: '+5%',
      icon: FiTarget,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      insights: ['Consistent work hours', 'Good project completion rate', 'Room for improvement in breaks']
    },
    {
      title: 'Health & Fitness',
      score: 65,
      trend: 'up',
      change: '+12%',
      icon: FiActivity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      insights: ['Step goals improving', 'Weight tracking consistent', 'Need more variety in workouts']
    },
    {
      title: 'Spiritual Growth',
      score: 82,
      trend: 'up',
      change: '+8%',
      icon: FiBook,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      insights: ['Regular study sessions', 'Good note-taking habits', 'Strong prayer consistency']
    }
  ];

  const weeklyHighlights = [
    {
      day: 'Monday',
      highlight: 'Completed 3 high-priority tasks',
      mood: 'productive',
      icon: FiTarget
    },
    {
      day: 'Wednesday',
      highlight: 'Achieved step goal + Bible study',
      mood: 'balanced',
      icon: FiActivity
    },
    {
      day: 'Friday',
      highlight: 'Finished project milestone early',
      mood: 'accomplished',
      icon: FiTrendingUp
    },
    {
      day: 'Sunday',
      highlight: 'Deep spiritual reflection session',
      mood: 'peaceful',
      icon: FiHeart
    }
  ];

  const recommendations = [
    {
      category: 'Health',
      title: 'Schedule Regular Breaks',
      description: 'Your productivity peaks when you take 10-minute breaks every 45 minutes.',
      priority: 'medium',
      impact: 'High'
    },
    {
      category: 'Spiritual',
      title: 'Morning Devotions',
      description: 'You\'re most reflective in the morning. Consider moving Bible study to 7 AM.',
      priority: 'low',
      impact: 'Medium'
    },
    {
      category: 'Work',
      title: 'Batch Similar Tasks',
      description: 'Group similar tasks together to reduce context switching and improve focus.',
      priority: 'high',
      impact: 'High'
    }
  ];

  const getMoodColor = (mood) => {
    const colors = {
      'productive': 'bg-blue-100 text-blue-800',
      'balanced': 'bg-green-100 text-green-800',
      'accomplished': 'bg-purple-100 text-purple-800',
      'peaceful': 'bg-amber-100 text-amber-800'
    };
    return colors[mood] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Life Areas Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lifeAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${area.bgColor} rounded-xl p-6 border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <SafeIcon icon={area.icon} className={`w-6 h-6 ${area.color}`} />
              <span className={`text-sm font-medium ${
                area.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {area.change}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-gray-900">{area.score}</div>
              <div className="text-sm text-gray-600">/100</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  area.score >= 80 ? 'bg-green-500' :
                  area.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${area.score}%` }}
              ></div>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {area.insights.map((insight, i) => (
                <li key={i}>• {insight}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Weekly Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">This Week's Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklyHighlights.map((highlight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={highlight.icon} className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">{highlight.day}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{highlight.highlight}</p>
              <span className={`px-2 py-1 text-xs rounded-full ${getMoodColor(highlight.mood)}`}>
                {highlight.mood}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Life Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Life Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {rec.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <span className="text-xs text-gray-500">Impact: {rec.impact}</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Life Goals Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Life Goals Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Complete Project Certification</h4>
                <p className="text-sm text-blue-700">Professional Development</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">75%</div>
              <div className="w-20 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Reach 10k Daily Steps</h4>
                <p className="text-sm text-green-700">Health & Fitness</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-900">60%</div>
              <div className="w-20 bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiBook} className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-purple-900">Read Bible Daily</h4>
                <p className="text-sm text-purple-700">Spiritual Growth</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-900">90%</div>
              <div className="w-20 bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LifeInsights;