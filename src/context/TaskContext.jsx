import React, {createContext, useContext, useReducer, useEffect} from 'react';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
  loading: false,
  error: null
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {...state, tasks: action.payload, loading: false};
    case 'ADD_TASK':
      return {...state, tasks: [...state.tasks, action.payload]};
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {...state, tasks: state.tasks.filter(task => task.id !== action.payload)};
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null}
            : task
        )
      };
    case 'SET_FILTER':
      return {...state, filter: action.payload};
    case 'SET_SEARCH':
      return {...state, searchQuery: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false};
    case 'CLEAR_ERROR':
      return {...state, error: null};
    default:
      return state;
  }
};

export const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        dispatch({type: 'SET_TASKS', payload: tasks});
      } else {
        dispatch({type: 'SET_TASKS', payload: []});
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      dispatch({type: 'SET_ERROR', payload: 'Failed to load tasks'});
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
      toast.error('Failed to save tasks');
    }
  }, [state.tasks]);

  const addTask = (task) => {
    try {
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false,
        completedAt: null
      };
      dispatch({type: 'ADD_TASK', payload: newTask});
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const updateTask = (task) => {
    try {
      const updatedTask = {
        ...task,
        updatedAt: new Date().toISOString()
      };
      dispatch({type: 'UPDATE_TASK', payload: updatedTask});
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = (id) => {
    try {
      dispatch({type: 'DELETE_TASK', payload: id});
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const toggleTask = (id) => {
    try {
      dispatch({type: 'TOGGLE_TASK', payload: id});
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task');
    }
  };

  const setFilter = (filter) => {
    dispatch({type: 'SET_FILTER', payload: filter});
  };

  const setSearchQuery = (query) => {
    dispatch({type: 'SET_SEARCH', payload: query});
  };

  const getFilteredTasks = () => {
    let filtered = [...state.tasks];

    // Apply status filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(task => {
        switch (state.filter) {
          case 'completed':
            return task.completed;
          case 'pending':
            return !task.completed;
          case 'high':
            return task.priority === 'high';
          case 'medium':
            return task.priority === 'medium';
          case 'low':
            return task.priority === 'low';
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (state.searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        (task.category && task.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    }

    // Sort tasks
    filtered.sort((a, b) => {
      // Pending tasks first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  };

  const getTaskStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = state.tasks.filter(task => task.priority === 'high' && !task.completed).length;
    const overdue = state.tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      !task.completed
    ).length;

    return {
      total,
      completed,
      pending,
      highPriority,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  };

  const clearError = () => {
    dispatch({type: 'CLEAR_ERROR'});
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSearchQuery,
    getFilteredTasks,
    getTaskStats,
    clearError
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};