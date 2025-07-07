import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../../context/HealthContext';

const { FiTrendingUp, FiTrendingDown, FiMinus, FiPlus, FiScale } = FiIcons;

const WeightTracker = () => {
  const { addWeightData } = useHealth();
  const [newWeight, setNewWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const weightData = [
    { date: '2024-01-15', weight: 75.2, change: -0.3 },
    { date: '2024-01-08', weight: 75.5, change: -0.2 },
    { date: '2024-01-01', weight: 75.7, change: -0.5 },
    { date: '2023-12-25', weight: 76.2, change: +0.1 },
    { date: '2023-12-18', weight: 76.1, change: -0.4 }
  ];

  const currentWeight = weightData[0].weight;
  const goalWeight = 73.0;
  const startWeight = 78.0;
  const progressToGoal = ((startWeight - currentWeight) / (startWeight - goalWeight)) * 100;

  const handleAddWeight = () => {
    if (newWeight && selectedDate) {
      addWeightData({
        date: selectedDate,
        value: parseFloat(newWeight)
      });
      setNewWeight('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTrendIcon = (change) => {
    if (change > 0) return FiTrendingUp;
    if (change < 0) return FiTrendingDown;
    return FiMinus;
  };

  const getTrendColor = (change) => {
    if (change > 0) return 'text-red-500';
    if (change < 0) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Current Weight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="text-center">
          <SafeIcon icon={FiScale} className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-gray-900 mb-2">{currentWeight} kg</div>
          <div className="flex items-center justify-center space-x-2">
            <SafeIcon 
              icon={getTrendIcon(weightData[0].change)} 
              className={`w-4 h-4 ${getTrendColor(weightData[0].change)}`} 
            />
            <span className={`text-sm font-medium ${getTrendColor(weightData[0].change)}`}>
              {Math.abs(weightData[0].change)} kg from last week
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Start Weight</p>
            <p className="text-lg font-bold text-gray-900">{startWeight} kg</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">Current</p>
            <p className="text-lg font-bold text-blue-900">{currentWeight} kg</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">Goal</p>
            <p className="text-lg font-bold text-green-900">{goalWeight} kg</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress to Goal</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(progressToGoal)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressToGoal, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {(currentWeight - goalWeight).toFixed(1)} kg to go
          </p>
        </div>
      </motion.div>

      {/* Add Weight Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Weight</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex-1 flex">
            <input
              type="number"
              step="0.1"
              placeholder="Weight"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">
              kg
            </span>
          </div>
          <button
            onClick={handleAddWeight}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </motion.div>

      {/* Weight History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weight History</h3>
        <div className="space-y-3">
          {weightData.map((entry, index) => (
            <div key={entry.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{formatDate(entry.date)}</p>
                <p className="text-sm text-gray-600">{entry.weight} kg</p>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon 
                  icon={getTrendIcon(entry.change)} 
                  className={`w-4 h-4 ${getTrendColor(entry.change)}`} 
                />
                <span className={`text-sm font-medium ${getTrendColor(entry.change)}`}>
                  {entry.change > 0 ? '+' : ''}{entry.change} kg
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">-1.2 kg</div>
            <div className="text-sm text-green-700">Weight Lost</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
            <div className="text-sm text-blue-700">Weigh-ins</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">0.3 kg</div>
            <div className="text-sm text-purple-700">Avg Change</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeightTracker;