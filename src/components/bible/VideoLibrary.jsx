import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiVideo, FiSearch, FiPlus, FiPlay, FiBookmark, FiClock } = FiIcons;

const VideoLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Videos', count: 24 },
    { id: 'sermons', label: 'Sermons', count: 12 },
    { id: 'studies', label: 'Bible Studies', count: 8 },
    { id: 'devotionals', label: 'Devotionals', count: 4 }
  ];

  const videos = [
    {
      id: 1,
      title: 'The Parable of the Good Samaritan',
      channel: 'Bible Study Central',
      duration: '24:15',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      category: 'studies',
      savedAt: '2024-01-15',
      notes: 3,
      summary: 'AI-generated summary: This video explores the cultural context and deeper meaning of Jesus\' parable about loving your neighbor...'
    },
    {
      id: 2,
      title: 'Faith and Works in James',
      channel: 'Deeper Walk Ministry',
      duration: '31:42',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      category: 'sermons',
      savedAt: '2024-01-12',
      notes: 5,
      summary: 'AI-generated summary: A comprehensive look at James 2:14-26 and how faith is demonstrated through our actions...'
    },
    {
      id: 3,
      title: 'Morning Devotion: Psalm 23',
      channel: 'Daily Bread',
      duration: '12:30',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      category: 'devotionals',
      savedAt: '2024-01-10',
      notes: 2,
      summary: 'AI-generated summary: A peaceful reflection on the shepherd psalm and finding comfort in God\'s guidance...'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Video</span>
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <SafeIcon icon={FiPlay} className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
              <button className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors">
                <SafeIcon icon={FiBookmark} className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{video.channel}</p>
              
              {/* AI Summary */}
              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">AI Summary</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{video.summary}</p>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>Saved {new Date(video.savedAt).toLocaleDateString()}</span>
                  </span>
                  <span>{video.notes} notes</span>
                </div>
                <span className={`px-2 py-1 rounded ${
                  video.category === 'sermons' ? 'bg-blue-100 text-blue-700' :
                  video.category === 'studies' ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {video.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiVideo} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No videos match "${searchQuery}"`
              : 'Start building your video library by adding your first video'
            }
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Add Your First Video
          </button>
        </motion.div>
      )}

      {/* Add Video Modal Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add Video</h3>
        <div className="flex space-x-2">
          <input
            type="url"
            placeholder="Paste YouTube URL here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add & Analyze
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          AI will automatically generate summary, extract key points, and categorize the video.
        </p>
      </div>
    </div>
  );
};

export default VideoLibrary;