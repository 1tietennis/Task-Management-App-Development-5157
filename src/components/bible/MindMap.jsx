import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMap, FiPlus, FiEdit, FiTrash2, FiSearch, FiShare } = FiIcons;

const MindMap = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mindMaps = [
    {
      id: 1,
      title: 'Faith and Works Study',
      description: 'Exploring the relationship between faith and actions in James 2',
      createdAt: '2024-01-15',
      lastModified: '2024-01-15',
      nodes: 12,
      connections: 8,
      tags: ['faith', 'works', 'james'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Love in Scripture',
      description: 'Comprehensive study of love throughout the Bible',
      createdAt: '2024-01-12',
      lastModified: '2024-01-14',
      nodes: 18,
      connections: 15,
      tags: ['love', 'agape', 'relationships'],
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Parables of Jesus',
      description: 'Visual mapping of Jesus\' parables and their meanings',
      createdAt: '2024-01-10',
      lastModified: '2024-01-11',
      nodes: 24,
      connections: 20,
      tags: ['parables', 'jesus', 'teaching'],
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const filteredMaps = mindMaps.filter(map =>
    map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    map.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    map.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNewMap = () => {
    // Logic to create new mind map
    console.log('Creating new mind map...');
  };

  const handleEditMap = (map) => {
    setSelectedMap(map);
    // Logic to open map editor
  };

  const getTagColor = (tag) => {
    const colors = {
      'faith': 'bg-blue-100 text-blue-800',
      'works': 'bg-green-100 text-green-800',
      'james': 'bg-purple-100 text-purple-800',
      'love': 'bg-red-100 text-red-800',
      'agape': 'bg-pink-100 text-pink-800',
      'relationships': 'bg-yellow-100 text-yellow-800',
      'parables': 'bg-indigo-100 text-indigo-800',
      'jesus': 'bg-amber-100 text-amber-800',
      'teaching': 'bg-emerald-100 text-emerald-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  if (selectedMap) {
    return (
      <div className="space-y-6">
        {/* Mind Map Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedMap.title}</h2>
              <p className="text-gray-600">{selectedMap.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiShare} className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => setSelectedMap(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Library
              </button>
            </div>
          </div>

          {/* Mind Map Canvas */}
          <div className="bg-gray-50 rounded-lg h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <SafeIcon icon={FiMap} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mind Map Editor</h3>
              <p className="text-gray-600 mb-4">Interactive mind map would be rendered here</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• {selectedMap.nodes} nodes</p>
                <p>• {selectedMap.connections} connections</p>
                <p>• Last modified: {new Date(selectedMap.lastModified).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Mind Map Tools */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Node</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors">
                Connect Nodes
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg transition-colors">
                Add Scripture
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                Zoom In
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                Zoom Out
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                Center
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mind maps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <button
          onClick={handleCreateNewMap}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Mind Map</span>
        </button>
      </div>

      {/* Mind Maps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaps.map((map, index) => (
          <motion.div
            key={map.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleEditMap(map)}
          >
            {/* Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <SafeIcon icon={FiMap} className="w-16 h-16 text-blue-600" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{map.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{map.description}</p>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <span>{map.nodes} nodes</span>
                <span>{map.connections} connections</span>
                <span>Modified {new Date(map.lastModified).toLocaleDateString()}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {map.tags.map((tag, i) => (
                  <span key={i} className={`px-2 py-1 text-xs rounded ${getTagColor(tag)}`}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Created {new Date(map.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMap(map);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaps.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiMap} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mind maps found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No mind maps match "${searchQuery}"`
              : 'Create your first mind map to visualize Bible study connections'
            }
          </p>
          <button
            onClick={handleCreateNewMap}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create Your First Mind Map
          </button>
        </motion.div>
      )}

      {/* Mind Map Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mind Map Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Book Study Template</h4>
            <p className="text-sm text-gray-600">Organize chapters, themes, and key verses</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Character Study Template</h4>
            <p className="text-sm text-gray-600">Map relationships and character development</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-2">Doctrine Template</h4>
            <p className="text-sm text-gray-600">Connect related theological concepts</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MindMap;