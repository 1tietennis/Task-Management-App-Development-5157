import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../../context/HealthContext';

const { FiActivity, FiTarget, FiPlus, FiCalendar } = FiIcons;

const StepsTracker = () => {
  const { addStepsData } = useHealth();
  const [manualSteps, setManualSteps] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todaySteps = 8750;
  const dailyGoal = 10000;
  const progress = (todaySteps / dailyGoal) * 100;

  const recentDays = [
    { date: '2024-01-15', steps: 8750, goal: 10000 },
    { date: '2024-01-14', steps: 9200, goal: 10000 },
    { date: '2024-01-13', steps: 10800, goal: 10000 },
    { date: '2024-01-12', steps: 7300, goal: 10000 },
    { date: '2024-01-11', steps: 11200, goal: 10000 }
  ];

  const handleAddSteps = () => {
    if (manualSteps && selectedDate) {
      addStepsData({
        date: selectedDate,
        count: parseInt(manualSteps),
        goal: dailyGoal
      });
      setManualSteps('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{todaySteps.toLocaleString()}</span>
              <span className="text-sm text-gray-600">steps today</span>
              <span className="text-xs text-gray-500 mt-1">{Math.round(progress)}% of goal</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-gray-900">{dailyGoal.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Daily Goal</p>
            </div>
            <div className="text-center">
              <SafeIcon icon={FiActivity} className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-gray-900">{Math.max(0, todaySteps - dailyGoal).toLocaleString()}</p>
              <p className="text-xs text-gray-600">Over Goal</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Manual Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Steps Manually</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Steps count"
            value={manualSteps}
            onChange={(e) => setManualSteps(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddSteps}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-3">
          {recentDays.map((day, index) => (
            <div key={day.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{formatDate(day.date)}</p>
                  <p className="text-sm text-gray-600">{day.steps.toLocaleString()} steps</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      day.steps >= day.goal ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((day.steps / day.goal) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${
                  day.steps >= day.goal ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {Math.round((day.steps / day.goal) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">56,250</div>
            <div className="text-sm text-blue-700">Total Steps</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">8,036</div>
            <div className="text-sm text-green-700">Daily Average</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-purple-700">Goals Met</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StepsTracker;