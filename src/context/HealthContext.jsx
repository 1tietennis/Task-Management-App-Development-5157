import React, { createContext, useContext, useReducer, useEffect } from 'react';

const HealthContext = createContext();

const initialState = {
  healthData: {
    steps: [],
    weight: [],
    goals: [],
    workouts: []
  },
  loading: false
};

const healthReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HEALTH_DATA':
      return { ...state, healthData: action.payload };
    case 'ADD_STEPS':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          steps: [...state.healthData.steps, action.payload]
        }
      };
    case 'ADD_WEIGHT':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          weight: [...state.healthData.weight, action.payload]
        }
      };
    case 'ADD_GOAL':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          goals: [...state.healthData.goals, action.payload]
        }
      };
    case 'UPDATE_GOAL':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          goals: state.healthData.goals.map(goal =>
            goal.id === action.payload.id ? action.payload : goal
          )
        }
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const HealthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  useEffect(() => {
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      dispatch({ type: 'SET_HEALTH_DATA', payload: JSON.parse(savedHealthData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(state.healthData));
  }, [state.healthData]);

  const addStepsData = (data) => {
    dispatch({ type: 'ADD_STEPS', payload: data });
  };

  const addWeightData = (data) => {
    dispatch({ type: 'ADD_WEIGHT', payload: data });
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      progress: 0
    };
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
  };

  const updateGoal = (goal) => {
    dispatch({ type: 'UPDATE_GOAL', payload: goal });
  };

  const getHealthStats = () => {
    const today = new Date().toDateString();
    const todaySteps = state.healthData.steps.find(s => 
      new Date(s.date).toDateString() === today
    );
    const latestWeight = state.healthData.weight[state.healthData.weight.length - 1];
    const activeGoals = state.healthData.goals.filter(g => g.status === 'active');
    
    return {
      todaySteps: todaySteps?.count || 0,
      currentWeight: latestWeight?.value || 0,
      activeGoals: activeGoals.length,
      totalGoals: state.healthData.goals.length
    };
  };

  const value = {
    ...state,
    addStepsData,
    addWeightData,
    addGoal,
    updateGoal,
    getHealthStats
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};