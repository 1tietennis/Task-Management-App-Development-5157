import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useProject } from '../../context/ProjectContext';

const { FiBriefcase, FiClock, FiCheckCircle, FiArrowRight } = FiIcons;

const ProjectWidget = () => {
  const navigate = useNavigate();
  const { projects, getProjectStats } = useProject();
  const stats = getProjectStats();

  const recentProjects = projects.slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
        <button
          onClick={() => navigate('/projects')}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{stats.active}</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
        </div>

        {/* Recent Projects List */}
        <div className="space-y-3">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 truncate">{project.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{project.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No projects yet</p>
          )}
        </div>

        {/* Quick Action */}
        <button
          onClick={() => navigate('/projects')}
          className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiBriefcase} className="w-5 h-5" />
          <span className="font-medium">View All Projects</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectWidget;