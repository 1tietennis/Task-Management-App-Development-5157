import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiFileText, FiVideo, FiMic, FiCalendar, FiTrendingUp, FiTarget, FiHeart } = FiIcons;

const StudyDashboard = () => {
  const stats = [
    { title: 'Study Sessions', value: 24, icon: FiBook, color: 'bg-blue-500', change: '+3' },
    { title: 'Notes Created', value: 18, icon: FiFileText, color: 'bg-green-500', change: '+5' },
    { title: 'Videos Saved', value: 12, icon: FiVideo, color: 'bg-red-500', change: '+2' },
    { title: 'Recordings', value: 8, icon: FiMic, color: 'bg-purple-500', change: '+1' }
  ];

  const recentStudies = [
    {
      title: 'Faith and Works - James 2:14-26',
      date: '2024-01-15',
      type: 'Doctrinal Study',
      notes: 3,
      duration: '45 min'
    },
    {
      title: 'The Good Samaritan - Luke 10:25-37',
      date: '2024-01-12',
      type: 'Historical Study',
      notes: 2,
      duration: '30 min'
    },
    {
      title: 'Love Chapter - 1 Corinthians 13',
      date: '2024-01-10',
      type: 'Topical Study',
      notes: 4,
      duration: '60 min'
    }
  ];

  const studyStreaks = {
    current: 7,
    longest: 14,
    weeklyGoal: 5
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Study Streak & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Studies</h3>
          <div className="space-y-4">
            {recentStudies.map((study, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{study.title}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{study.type}</span>
                    <span>{study.notes} notes</span>
                    <span>{study.duration}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(study.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Study Streak */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Streak</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{studyStreaks.current}</div>
                <div className="text-sm text-gray-600">days in a row</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{studyStreaks.longest}</div>
                  <div className="text-xs text-gray-600">Longest streak</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{studyStreaks.weeklyGoal}</div>
                  <div className="text-xs text-gray-600">Weekly goal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiBook} className="w-5 h-5" />
                <span>New Study Session</span>
              </button>
              <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiFileText} className="w-5 h-5" />
                <span>Add Notes</span>
              </button>
              <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiMic} className="w-5 h-5" />
                <span>Voice Recording</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Study Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Study Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <SafeIcon icon={FiTarget} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <div className="text-sm text-blue-700">Books Studied</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
            <div className="text-sm text-green-700">Goal Progress</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <SafeIcon icon={FiHeart} className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600 mb-1">42h</div>
            <div className="text-sm text-purple-700">Total Time</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyDashboard;