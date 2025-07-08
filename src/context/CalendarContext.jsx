import React, {createContext, useContext, useReducer, useEffect} from 'react';
import {useTask} from './TaskContext';
import {useProject} from './ProjectContext';
import {useBible} from './BibleContext';
import {useHealth} from './HealthContext';
import toast from 'react-hot-toast';

const CalendarContext = createContext();

const initialState = {
  events: [],
  googleCalendarConnected: false,
  syncStatus: 'disconnected',
  loading: false,
  lastSync: null,
  calendarSettings: {
    autoSync: true,
    syncTasks: true,
    syncProjects: true,
    syncBibleStudy: true,
    syncHealth: true,
    defaultCalendar: 'primary'
  }
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {...state, events: action.payload, loading: false};
    case 'ADD_EVENT':
      return {...state, events: [...state.events, action.payload]};
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case 'DELETE_EVENT':
      return {...state, events: state.events.filter(event => event.id !== action.payload)};
    case 'SET_GOOGLE_CONNECTION':
      return {...state, googleCalendarConnected: action.payload};
    case 'SET_SYNC_STATUS':
      return {...state, syncStatus: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_LAST_SYNC':
      return {...state, lastSync: action.payload};
    case 'UPDATE_SETTINGS':
      return {...state, calendarSettings: {...state.calendarSettings, ...action.payload}};
    default:
      return state;
  }
};

export const CalendarProvider = ({children}) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const {tasks} = useTask();
  const {projects} = useProject();
  const {studies} = useBible();
  const {healthData} = useHealth();

  // Load calendar data on mount
  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendarData');
    if (savedCalendar) {
      const data = JSON.parse(savedCalendar);
      dispatch({type: 'SET_EVENTS', payload: data.events || []});
      dispatch({type: 'SET_GOOGLE_CONNECTION', payload: data.googleCalendarConnected || false});
      dispatch({type: 'SET_SYNC_STATUS', payload: data.syncStatus || 'disconnected'});
      dispatch({type: 'SET_LAST_SYNC', payload: data.lastSync});
    }
  }, []);

  // Save calendar data
  useEffect(() => {
    const calendarData = {
      events: state.events,
      googleCalendarConnected: state.googleCalendarConnected,
      syncStatus: state.syncStatus,
      lastSync: state.lastSync
    };
    localStorage.setItem('calendarData', JSON.stringify(calendarData));
  }, [state.events, state.googleCalendarConnected, state.syncStatus, state.lastSync]);

  // Auto-sync when data changes
  useEffect(() => {
    if (state.calendarSettings.autoSync && state.googleCalendarConnected) {
      syncAllSystems();
    }
  }, [tasks, projects, studies, healthData]);

  const connectGoogleCalendar = async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      
      // Simulate Google Calendar API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({type: 'SET_GOOGLE_CONNECTION', payload: true});
      dispatch({type: 'SET_SYNC_STATUS', payload: 'connected'});
      dispatch({type: 'SET_LAST_SYNC', payload: new Date().toISOString()});
      
      toast.success('Google Calendar connected successfully!');
      
      // Initial sync
      await syncAllSystems();
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      toast.error('Failed to connect to Google Calendar');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const disconnectGoogleCalendar = () => {
    dispatch({type: 'SET_GOOGLE_CONNECTION', payload: false});
    dispatch({type: 'SET_SYNC_STATUS', payload: 'disconnected'});
    toast.success('Google Calendar disconnected');
  };

  const syncAllSystems = async () => {
    if (!state.googleCalendarConnected) return;

    try {
      dispatch({type: 'SET_SYNC_STATUS', payload: 'syncing'});
      
      const syncedEvents = [];

      // Sync Tasks
      if (state.calendarSettings.syncTasks) {
        const taskEvents = tasks
          .filter(task => task.dueDate && !task.completed)
          .map(task => ({
            id: `task-${task.id}`,
            title: `📋 ${task.title}`,
            description: task.description,
            start: new Date(task.dueDate),
            end: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000), // 1 hour duration
            type: 'task',
            priority: task.priority,
            source: 'tasks',
            originalId: task.id,
            color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'
          }));
        syncedEvents.push(...taskEvents);
      }

      // Sync Projects
      if (state.calendarSettings.syncProjects) {
        const projectEvents = projects
          .filter(project => project.deadline && project.status === 'active')
          .map(project => ({
            id: `project-${project.id}`,
            title: `💼 ${project.name}`,
            description: project.description,
            start: new Date(project.deadline),
            end: new Date(new Date(project.deadline).getTime() + 2 * 60 * 60 * 1000), // 2 hours duration
            type: 'project',
            source: 'projects',
            originalId: project.id,
            color: '#8b5cf6'
          }));
        syncedEvents.push(...projectEvents);
      }

      // Sync Bible Study
      if (state.calendarSettings.syncBibleStudy) {
        const studyEvents = studies
          .slice(-5) // Last 5 studies
          .map(study => ({
            id: `study-${study.id}`,
            title: `📖 ${study.title}`,
            description: study.description,
            start: new Date(study.createdAt),
            end: new Date(new Date(study.createdAt).getTime() + 60 * 60 * 1000), // 1 hour duration
            type: 'bible-study',
            source: 'bible',
            originalId: study.id,
            color: '#f59e0b'
          }));
        syncedEvents.push(...studyEvents);
      }

      // Sync Health Goals
      if (state.calendarSettings.syncHealth && healthData.goals) {
        const healthEvents = healthData.goals
          .filter(goal => goal.deadline && goal.status === 'active')
          .map(goal => ({
            id: `health-${goal.id}`,
            title: `💪 ${goal.title}`,
            description: goal.description,
            start: new Date(goal.deadline),
            end: new Date(new Date(goal.deadline).getTime() + 30 * 60 * 1000), // 30 minutes duration
            type: 'health',
            source: 'health',
            originalId: goal.id,
            color: '#10b981'
          }));
        syncedEvents.push(...healthEvents);
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch({type: 'SET_EVENTS', payload: syncedEvents});
      dispatch({type: 'SET_SYNC_STATUS', payload: 'connected'});
      dispatch({type: 'SET_LAST_SYNC', payload: new Date().toISOString()});
      
      toast.success(`Synced ${syncedEvents.length} events successfully!`);
    } catch (error) {
      console.error('Error syncing calendar:', error);
      dispatch({type: 'SET_SYNC_STATUS', payload: 'error'});
      toast.error('Failed to sync calendar');
    }
  };

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: event.id || Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({type: 'ADD_EVENT', payload: newEvent});
    toast.success('Event added successfully!');
  };

  const updateEvent = (event) => {
    dispatch({type: 'UPDATE_EVENT', payload: event});
    toast.success('Event updated successfully!');
  };

  const deleteEvent = (id) => {
    dispatch({type: 'DELETE_EVENT', payload: id});
    toast.success('Event deleted successfully!');
  };

  const getEventsForDate = (date) => {
    const targetDate = new Date(date).toDateString();
    return state.events.filter(event => 
      new Date(event.start).toDateString() === targetDate
    );
  };

  const getUpcomingEvents = (days = 7) => {
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return state.events
      .filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= now && eventDate <= future;
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  const updateSettings = (settings) => {
    dispatch({type: 'UPDATE_SETTINGS', payload: settings});
    toast.success('Calendar settings updated!');
  };

  const value = {
    ...state,
    connectGoogleCalendar,
    disconnectGoogleCalendar,
    syncAllSystems,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getUpcomingEvents,
    updateSettings
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};