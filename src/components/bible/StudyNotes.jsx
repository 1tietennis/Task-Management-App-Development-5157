import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiSearch, FiPlus, FiEdit, FiTrash2, FiTag, FiCalendar } = FiIcons;

const StudyNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = [
    { id: 'all', label: 'All Notes', count: 24 },
    { id: 'faith', label: 'Faith', count: 8 },
    { id: 'love', label: 'Love', count: 6 },
    { id: 'prayer', label: 'Prayer', count: 4 },
    { id: 'wisdom', label: 'Wisdom', count: 6 }
  ];

  const notes = [
    {
      id: 1,
      title: 'Faith and Works - James 2:14-26',
      content: 'James teaches that faith without works is dead. This doesn\'t contradict salvation by grace, but shows that genuine faith produces good works as evidence...',
      tags: ['faith', 'works'],
      verses: ['James 2:14-26', 'Ephesians 2:8-10'],
      createdAt: '2024-01-15',
      lastModified: '2024-01-15',
      category: 'Doctrinal Study'
    },
    {
      id: 2,
      title: 'The Good Samaritan - Luke 10:25-37',
      content: 'Jesus uses this parable to redefine "neighbor" and challenge religious prejudices. The Samaritan shows mercy while religious leaders pass by...',
      tags: ['love', 'mercy'],
      verses: ['Luke 10:25-37'],
      createdAt: '2024-01-12',
      lastModified: '2024-01-13',
      category: 'Historical Study'
    },
    {
      id: 3,
      title: 'Prayer in the Garden - Matthew 26:36-46',
      content: 'Jesus\' prayer in Gethsemane shows His humanity and submission to the Father\'s will. "Not my will, but yours be done" is the model for surrender...',
      tags: ['prayer', 'surrender'],
      verses: ['Matthew 26:36-46', 'Luke 22:39-46'],
      createdAt: '2024-01-10',
      lastModified: '2024-01-10',
      category: 'Devotional'
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.verses.some(verse => verse.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const getTagColor = (tag) => {
    const colors = {
      'faith': 'bg-blue-100 text-blue-800',
      'love': 'bg-red-100 text-red-800',
      'prayer': 'bg-purple-100 text-purple-800',
      'wisdom': 'bg-yellow-100 text-yellow-800',
      'works': 'bg-green-100 text-green-800',
      'mercy': 'bg-pink-100 text-pink-800',
      'surrender': 'bg-indigo-100 text-indigo-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes and verses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.label} ({tag.count})
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {note.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

                {/* Verses */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Referenced Verses:</h4>
                  <div className="flex flex-wrap gap-2">
                    {note.verses.map((verse, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">
                        {verse}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, i) => (
                      <span key={i} className={`px-2 py-1 text-xs rounded ${getTagColor(tag)}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                    <span>Created {new Date(note.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span>Last modified {new Date(note.lastModified).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiFileText} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No notes match "${searchQuery}"`
              : 'Start taking study notes to build your personal Bible study library'
            }
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Create Your First Note
          </button>
        </motion.div>
      )}

      {/* Quick Note Creator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Note</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Bible verses (e.g., John 3:16, Romans 8:28)..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Your study notes and insights..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Tags (separated by commas)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotes;