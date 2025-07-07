import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';

const { FiCalendar, FiClock, FiArrowRight } = FiIcons;

const CalendarWidget = () => {
  const navigate = useNavigate();
  const { tasks } = useTask();

  const today = new Date();
  const todayStr = today.toDateString();
  
  const upcomingTasks = tasks
    .filter(task => task.dueDate && !task.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  const todayTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate).toDateString() === todayStr
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isToday = date.toDateString() === todayStr;
    const isTomorrow = date.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
        <button
          onClick={() => navigate('/calendar')}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Today's Summary */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiCalendar} className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Today</h4>
          </div>
          <p className="text-sm text-blue-700">
            {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} due today
          </p>
        </div>

        {/* Upcoming Tasks */}
        <div className="space-y-3">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 truncate flex-1">{task.title}</h4>
                  <span className="text-sm text-gray-500 ml-2">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">{task.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No upcoming tasks</p>
          )}
        </div>

        {/* Quick Action */}
        <button
          onClick={() => navigate('/calendar')}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiCalendar} className="w-5 h-5" />
          <span className="font-medium">View Calendar</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CalendarWidget;