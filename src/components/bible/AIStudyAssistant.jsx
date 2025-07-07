import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBot, FiSend, FiBook, FiSearch, FiHeart, FiTarget } = FiIcons;

const AIStudyAssistant = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'ai',
      content: 'Welcome! I\'m your AI Bible study assistant. I can help you with verse interpretation, historical context, doctrinal questions, and study suggestions. What would you like to explore today?',
      timestamp: new Date().toISOString()
    }
  ]);

  const quickPrompts = [
    'Explain the historical context of...',
    'What does this verse mean?',
    'Help me understand the doctrine of...',
    'Suggest verses about faith',
    'Create a study plan for...',
    'Compare different translations'
  ];

  const studyModes = [
    {
      title: 'Conservative Interpretation',
      description: 'Traditional, literal interpretation focusing on historical accuracy',
      icon: FiBook,
      active: true
    },
    {
      title: 'Topical Analysis',
      description: 'Cross-reference verses by themes and topics',
      icon: FiTarget,
      active: false
    },
    {
      title: 'Devotional Focus',
      description: 'Personal application and spiritual growth emphasis',
      icon: FiHeart,
      active: false
    }
  ];

  const handleSendQuery = () => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: generateAIResponse(query),
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, aiResponse]);
    }, 1000);

    setQuery('');
  };

  const generateAIResponse = (question) => {
    // Mock AI responses based on question content
    if (question.toLowerCase().includes('faith')) {
      return 'Faith is a central theme in Scripture. Hebrews 11:1 defines it as "the substance of things hoped for, the evidence of things not seen." This verse teaches us that faith is both confident assurance and conviction. In the conservative interpretation, faith is not blind belief but trust based on God\'s revealed character and promises throughout Scripture.';
    }
    
    if (question.toLowerCase().includes('love')) {
      return '1 Corinthians 13:4-7 provides the most comprehensive definition of love in Scripture. The Greek word "agape" used here refers to unconditional, sacrificial love that seeks the highest good of others. This love is patient, kind, not envious or boastful, not arrogant or rude, and keeps no record of wrongs.';
    }

    return 'That\'s a thoughtful question! Let me provide some biblical insight on that topic. The Scriptures offer rich wisdom that can help us understand this better. Would you like me to explore specific verses or provide historical context for your question?';
  };

  const handleQuickPrompt = (prompt) => {
    setQuery(prompt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chat Interface */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiBot} className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Study Assistant</h3>
                <p className="text-sm text-gray-600">Conservative Biblical Interpretation</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                placeholder="Ask about verses, doctrine, or request study help..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendQuery}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiSend} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Study Modes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Modes</h3>
          <div className="space-y-3">
            {studyModes.map((mode, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  mode.active
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={mode.icon} className={`w-5 h-5 mt-0.5 ${
                    mode.active ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      mode.active ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {mode.title}
                    </h4>
                    <p className={`text-sm ${
                      mode.active ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {mode.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Prompts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Prompts</h3>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 text-sm">Faith & Works</h4>
              <p className="text-xs text-amber-700 mt-1">James 2:14-26 explains the relationship between faith and deeds...</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 text-sm">Love Definition</h4>
              <p className="text-xs text-green-700 mt-1">1 Corinthians 13 provides the biblical framework for agape love...</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIStudyAssistant;