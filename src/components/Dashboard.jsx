import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';
import TaskChart from './TaskChart';
import HealthWidget from './widgets/HealthWidget';
import BibleWidget from './widgets/BibleWidget';
import ProjectWidget from './widgets/ProjectWidget';
import CalendarWidget from './widgets/CalendarWidget';
import AIInsightsWidget from './widgets/AIInsightsWidget';

const { 
  FiPlus, FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, 
  FiCalendar, FiActivity, FiBook, FiBriefcase, FiBot 
} = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, getTaskStats } = useTask();
  const stats = getTaskStats();

  const quickStats = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: FiTrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: FiCheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: FiClock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: FiAlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const quickActions = [
    { title: 'Add Task', icon: FiPlus, path: '/add-task', color: 'bg-blue-600' },
    { title: 'View Projects', icon: FiBriefcase, path: '/projects', color: 'bg-purple-600' },
    { title: 'Health Check', icon: FiActivity, path: '/health', color: 'bg-green-600' },
    { title: 'Bible Study', icon: FiBook, path: '/bible-study', color: 'bg-amber-600' },
    { title: 'AI Assistant', icon: FiBot, path: '/ai-assistant', color: 'bg-indigo-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600 mt-1">Here's your life overview for today</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/ai-assistant')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiBot} className="w-5 h-5" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => navigate('/add-task')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`${action.color} hover:opacity-90 text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-all`}
            >
              <SafeIcon icon={action.icon} className="w-6 h-6" />
              <span className="text-sm font-medium">{action.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Progress</h3>
              <TaskChart />
            </motion.div>

            <HealthWidget />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <CalendarWidget />
            <BibleWidget />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AIInsightsWidget />
            <ProjectWidget />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;