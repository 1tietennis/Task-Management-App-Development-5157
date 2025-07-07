import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../context/TaskContext';

const { 
  FiHome, FiList, FiPlus, FiX, FiCheckCircle, FiClock, FiAlertCircle,
  FiBriefcase, FiCalendar, FiActivity, FiBook, FiFolder, FiBot,
  FiSettings, FiTarget, FiHeart, FiBookOpen, FiCloud
} = FiIcons;

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentView, setCurrentView }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilter, filter, getTaskStats } = useTask();
  const stats = getTaskStats();

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
    { id: 'tasks', label: 'Tasks', icon: FiList, path: '/tasks' },
    { id: 'projects', label: 'Projects', icon: FiBriefcase, path: '/projects' },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar, path: '/calendar' },
    { id: 'health', label: 'Health', icon: FiActivity, path: '/health' },
    { id: 'bible-study', label: 'Bible Study', icon: FiBook, path: '/bible-study' },
    { id: 'files', label: 'Files', icon: FiFolder, path: '/files' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: FiBot, path: '/ai-assistant' }
  ];

  const filterItems = [
    { id: 'all', label: 'All Tasks', icon: FiList, count: stats.total },
    { id: 'pending', label: 'Pending', icon: FiClock, count: stats.pending },
    { id: 'completed', label: 'Completed', icon: FiCheckCircle, count: stats.completed },
    { id: 'high', label: 'High Priority', icon: FiAlertCircle, count: stats.highPriority }
  ];

  const quickActions = [
    { id: 'add-task', label: 'Add Task', icon: FiPlus, path: '/add-task' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/settings' }
  ];

  const handleNavigation = (item) => {
    navigate(item.path);
    setCurrentView(item.id);
    setSidebarOpen(false);
  };

  const handleFilterChange = (filterId) => {
    setFilter(filterId);
    if (location.pathname !== '/tasks') {
      navigate('/tasks');
      setCurrentView('tasks');
    }
    setSidebarOpen(false);
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: -320 }
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 lg:z-30 lg:translate-x-0 overflow-y-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">LifeFlow</h2>
                <p className="text-xs text-gray-500">AI Life Manager</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Main
              </h3>
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Task Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Task Filters
              </h3>
              {filterItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors mb-1 ${
                    filter === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={item.icon} className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    filter === item.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              {quickActions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 text-gray-700 hover:bg-gray-50"
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-medium text-sm">U</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;