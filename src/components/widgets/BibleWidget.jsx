import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useBible } from '../../context/BibleContext';

const { FiBook, FiBookOpen, FiVideo, FiMic, FiArrowRight } = FiIcons;

const BibleWidget = () => {
  const navigate = useNavigate();
  const { getStudyStats } = useBible();
  const stats = getStudyStats();

  const studyMetrics = [
    { label: 'Studies', value: stats.totalStudies, icon: FiBook, color: 'text-amber-600' },
    { label: 'Notes', value: stats.totalNotes, icon: FiBookOpen, color: 'text-blue-600' },
    { label: 'Videos', value: stats.totalVideos, icon: FiVideo, color: 'text-red-600' },
    { label: 'Recordings', value: stats.totalRecordings, icon: FiMic, color: 'text-green-600' }
  ];

  const verseOfDay = {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me."
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bible Study</h3>
        <button
          onClick={() => navigate('/bible-study')}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Verse of the Day */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
          <p className="text-sm font-medium text-amber-800 mb-1">Verse of the Day</p>
          <p className="text-sm text-amber-700 italic mb-2">"{verseOfDay.text}"</p>
          <p className="text-xs text-amber-600 font-medium">- {verseOfDay.reference}</p>
        </div>

        {/* Study Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {studyMetrics.map((metric, index) => (
            <div key={metric.label} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <SafeIcon icon={metric.icon} className={`w-5 h-5 ${metric.color}`} />
              <div>
                <p className="text-sm font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <button
          onClick={() => navigate('/bible-study')}
          className="w-full bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiBook} className="w-5 h-5" />
          <span className="font-medium">Start Bible Study</span>
        </button>
      </div>
    </motion.div>
  );
};

export default BibleWidget;