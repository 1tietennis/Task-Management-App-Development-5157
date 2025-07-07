import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AIContext = createContext();

const initialState = {
  conversations: [],
  insights: [],
  suggestions: [],
  loading: false,
  aiEnabled: true
};

const aiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'ADD_CONVERSATION':
      return { ...state, conversations: [...state.conversations, action.payload] };
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? action.payload : conv
        )
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? { ...conv, messages: [...conv.messages, action.payload.message] }
            : conv
        )
      };
    case 'ADD_INSIGHT':
      return { ...state, insights: [...state.insights, action.payload] };
    case 'ADD_SUGGESTION':
      return { ...state, suggestions: [...state.suggestions, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  useEffect(() => {
    const savedAIData = localStorage.getItem('aiData');
    if (savedAIData) {
      const data = JSON.parse(savedAIData);
      dispatch({ type: 'SET_CONVERSATIONS', payload: data.conversations || [] });
    }
  }, []);

  useEffect(() => {
    const aiData = {
      conversations: state.conversations,
      insights: state.insights,
      suggestions: state.suggestions
    };
    localStorage.setItem('aiData', JSON.stringify(aiData));
  }, [state.conversations, state.insights, state.suggestions]);

  const createConversation = (title) => {
    const newConversation = {
      id: Date.now().toString(),
      title: title || 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
    return newConversation;
  };

  const addMessage = (conversationId, message) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message.content,
      type: message.type || 'user',
      timestamp: new Date().toISOString()
    };
    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { conversationId, message: newMessage } 
    });
  };

  const generateAIResponse = async (message) => {
    // Mock AI response generation
    const responses = [
      "I can help you manage your tasks more effectively. Would you like me to analyze your current workload?",
      "Based on your recent activity, I suggest prioritizing your high-importance tasks first.",
      "I notice you have several Bible study sessions scheduled. Would you like me to generate some study questions?",
      "Your health metrics show good progress. Keep up the great work!",
      "I can help you organize your projects better. Would you like some suggestions?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const addInsight = (insight) => {
    const newInsight = {
      ...insight,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_INSIGHT', payload: newInsight });
  };

  const addSuggestion = (suggestion) => {
    const newSuggestion = {
      ...suggestion,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_SUGGESTION', payload: newSuggestion });
  };

  const getAIStats = () => {
    const totalConversations = state.conversations.length;
    const totalMessages = state.conversations.reduce((acc, conv) => acc + conv.messages.length, 0);
    const totalInsights = state.insights.length;
    const totalSuggestions = state.suggestions.length;
    
    return { totalConversations, totalMessages, totalInsights, totalSuggestions };
  };

  const value = {
    ...state,
    createConversation,
    addMessage,
    generateAIResponse,
    addInsight,
    addSuggestion,
    getAIStats
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};