import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiUsers, FiTarget } = FiIcons;

const ProjectCard = ({ project, viewMode, onClick, delay }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow ${
        viewMode === 'list' ? 'flex items-center justify-between' : ''
      }`}
      onClick={onClick}
    >
      <div className={viewMode === 'list' ? 'flex-1' : ''}>
        <div className={`${viewMode === 'list' ? 'flex items-center justify-between mb-2' : 'mb-4'}`}>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} ${
            viewMode === 'list' ? 'ml-4' : ''
          }`}>
            {project.status}
          </span>
        </div>
        
        <p className={`text-gray-600 ${viewMode === 'list' ? 'line-clamp-1' : 'mb-4'}`}>
          {project.description}
        </p>

        {viewMode === 'grid' && (
          <>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                <span>{formatDate(project.deadline)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiTarget} className="w-4 h-4" />
                <span>{project.progress || 0}%</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress || 0}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;