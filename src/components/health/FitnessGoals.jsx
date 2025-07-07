import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useHealth } from '../../context/HealthContext';

const { FiTarget, FiPlus, FiEdit, FiTrash2, FiCheck, FiClock } = FiIcons;

const FitnessGoals = () => {
  const { addGoal, updateGoal } = useHealth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    category: 'fitness'
  });

  const goals = [
    {
      id: 1,
      title: 'Walk 10,000 steps daily',
      description: 'Maintain consistent daily activity',
      target: 10000,
      current: 8750,
      unit: 'steps',
      deadline: '2024-03-01',
      category: 'fitness',
      status: 'active',
      progress: 87.5
    },
    {
      id: 2,
      title: 'Lose 5kg',
      description: 'Reach target weight through healthy lifestyle',
      target: 73,
      current: 75.2,
      unit: 'kg',
      deadline: '2024-06-01',
      category: 'weight',
      status: 'active',
      progress: 56
    },
    {
      id: 3,
      title: 'Exercise 4x per week',
      description: 'Regular workout schedule',
      target: 4,
      current: 3,
      unit: 'sessions',
      deadline: '2024-12-31',
      category: 'exercise',
      status: 'active',
      progress: 75
    },
    {
      id: 4,
      title: 'Run 5K',
      description: 'Complete a 5K run without stopping',
      target: 5,
      current: 3.2,
      unit: 'km',
      deadline: '2024-04-15',
      category: 'running',
      status: 'active',
      progress: 64
    }
  ];

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target) {
      addGoal(newGoal);
      setNewGoal({
        title: '',
        description: '',
        target: '',
        deadline: '',
        category: 'fitness'
      });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      fitness: 'bg-blue-50 border-blue-200',
      weight: 'bg-green-50 border-green-200',
      exercise: 'bg-purple-50 border-purple-200',
      running: 'bg-red-50 border-red-200'
    };
    return colors[category] || 'bg-gray-50 border-gray-200';
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Fitness Goals</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Target value"
              value={newGoal.target}
              onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fitness">Fitness</option>
              <option value="weight">Weight</option>
              <option value="exercise">Exercise</option>
              <option value="running">Running</option>
            </select>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <textarea
            placeholder="Goal description"
            value={newGoal.description}
            onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGoal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Goal
            </button>
          </div>
        </motion.div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-xl border-2 p-6 ${getCategoryColor(goal.category)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-bold text-gray-900">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{Math.round(goal.progress)}% complete</span>
                <span className="text-xs text-gray-500">
                  {goal.target - goal.current} {goal.unit} to go
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span>{formatDeadline(goal.deadline)}</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                Update Progress
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Goals Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Goals Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
            <div className="text-sm text-blue-700">Active Goals</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">70%</div>
            <div className="text-sm text-green-700">Avg Progress</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">2</div>
            <div className="text-sm text-yellow-700">Due This Month</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
            <div className="text-sm text-purple-700">Completed Total</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FitnessGoals;