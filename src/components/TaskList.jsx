import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useTask} from '../context/TaskContext';
import toast from 'react-hot-toast';

const {FiPlus, FiEdit2, FiTrash2, FiCalendar, FiCheck, FiClock, FiFilter, FiSearch} = FiIcons;

const TaskList = () => {
  const navigate = useNavigate();
  const {getFilteredTasks, toggleTask, deleteTask, filter, setFilter, searchQuery, setSearchQuery} = useTask();
  const [localFilter, setLocalFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  
  const tasks = getFilteredTasks();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.success('Task deleted successfully!');
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-task/${id}`);
  };

  const handleToggle = (id, e) => {
    e.stopPropagation();
    toggleTask(id);
    toast.success('Task updated!');
  };

  const getFilterTitle = () => {
    switch (filter) {
      case 'completed': return 'Completed Tasks';
      case 'pending': return 'Pending Tasks';
      case 'high': return 'High Priority Tasks';
      case 'medium': return 'Medium Priority Tasks';
      case 'low': return 'Low Priority Tasks';
      default: return 'All Tasks';
    }
  };

  const handleQuickAdd = () => {
    navigate('/add-task');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getFilterTitle()}</h1>
            <p className="text-gray-600 mt-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} found
            </p>
          </div>
          <button
            onClick={handleQuickAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="created">Sort by Created</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="alphabetical">Sort A-Z</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <AnimatePresence>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -20}}
                  transition={{duration: 0.3, delay: index * 0.05}}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                    task.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={(e) => handleToggle(task.id, e)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {task.completed && (
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p
                          className={`mt-1 ${
                            task.completed ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {task.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span
                            className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority} priority
                          </span>
                          {task.category && (
                            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                              {task.category}
                            </span>
                          )}
                          {task.dueDate && (
                            <span className="text-sm text-gray-500 flex items-center">
                              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                              {formatDate(task.dueDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleEdit(task.id, e)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiEdit2} className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(task.id, e)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="text-center py-12"
              >
                <SafeIcon icon={FiClock} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'all'
                    ? "You haven't created any tasks yet. Start by adding your first task!"
                    : `No tasks match the current filter: ${filter}`}
                </p>
                <button
                  onClick={handleQuickAdd}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                  <span>Add Your First Task</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.completed).length}
              </div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {tasks.filter(t => !t.completed).length}
              </div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.priority === 'high' && !t.completed).length}
              </div>
              <div className="text-sm text-red-700">High Priority</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskList;