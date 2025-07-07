import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMic, FiSquare, FiPlay, FiPause, FiTrash2, FiEdit, FiDownload } = FiIcons;

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedRecording, setSelectedRecording] = useState(null);

  const recordings = [
    {
      id: 1,
      title: 'Faith and Works Study',
      duration: '4:32',
      date: '2024-01-15',
      transcription: 'In studying James 2:14-26, I\'ve been reflecting on how faith and works complement each other. James isn\'t contradicting Paul\'s teaching on grace, but rather showing that genuine faith naturally produces good works...',
      linkedNotes: ['Faith and Works - James 2:14-26'],
      tags: ['faith', 'works', 'james']
    },
    {
      id: 2,
      title: 'Morning Prayer Reflection',
      duration: '2:18',
      date: '2024-01-12',
      transcription: 'Lord, as I begin this day, I\'m reminded of Psalm 23. You are my shepherd, and I lack nothing. Help me to trust in Your guidance today...',
      linkedNotes: ['Prayer in the Garden - Matthew 26:36-46'],
      tags: ['prayer', 'psalm23', 'morning']
    },
    {
      id: 3,
      title: 'Parable Insights',
      duration: '6:45',
      date: '2024-01-10',
      transcription: 'The Good Samaritan parable challenges our understanding of who our neighbor is. Jesus deliberately chose a Samaritan as the hero to break down racial and religious prejudices...',
      linkedNotes: ['The Good Samaritan - Luke 10:25-37'],
      tags: ['parables', 'love', 'mercy']
    }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Start recording logic would go here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Stop recording logic would go here
  };

  const handlePlayRecording = (recording) => {
    setSelectedRecording(recording);
    setIsPlaying(true);
    // Play recording logic would go here
  };

  const handlePauseRecording = () => {
    setIsPlaying(false);
    // Pause recording logic would go here
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Recording Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Voice Recorder</h3>
        
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className={`w-full h-full rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
              isRecording 
                ? 'border-red-500 bg-red-50 animate-pulse' 
                : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
            }`}>
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <SafeIcon 
                  icon={isRecording ? FiSquare : FiMic} 
                  className="w-8 h-8 text-white" 
                />
              </button>
            </div>
            {isRecording && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <span className="text-red-600 font-mono text-sm">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600">
            {isRecording ? 'Recording in progress...' : 'Tap to start recording'}
          </p>
          
          {isRecording && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Recording title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Recordings List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recordings</h3>
        
        <div className="space-y-4">
          {recordings.map((recording, index) => (
            <div key={recording.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{recording.title}</h4>
                  <p className="text-sm text-gray-600">
                    {recording.duration} • {new Date(recording.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => 
                      isPlaying && selectedRecording?.id === recording.id
                        ? handlePauseRecording()
                        : handlePlayRecording(recording)
                    }
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <SafeIcon 
                      icon={isPlaying && selectedRecording?.id === recording.id ? FiPause : FiPlay} 
                      className="w-5 h-5" 
                    />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <SafeIcon icon={FiEdit} className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Transcription */}
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Transcription:</h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg line-clamp-3">
                  {recording.transcription}
                </p>
              </div>

              {/* Linked Notes */}
              {recording.linkedNotes.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Linked Notes:</h5>
                  <div className="flex flex-wrap gap-2">
                    {recording.linkedNotes.map((note, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {recording.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recording Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recording Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto-transcription</label>
              <p className="text-xs text-gray-500">Automatically transcribe recordings</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto-link to notes</label>
              <p className="text-xs text-gray-500">Suggest related study notes</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Recording Quality</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="high">High (48kHz)</option>
              <option value="medium">Medium (44kHz)</option>
              <option value="low">Low (22kHz)</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceRecorder;