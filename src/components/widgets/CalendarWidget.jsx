import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useCalendar} from '../../context/CalendarContext';

const {FiCalendar, FiClock, FiArrowRight, FiCloud, FiRefreshCw} = FiIcons;

const CalendarWidget = () => {
  const navigate = useNavigate();
  const {
    events,
    googleCalendarConnected,
    syncStatus,
    getUpcomingEvents,
    getEventsForDate
  } = useCalendar();

  const today = new Date();
  const todayStr = today.toDateString();
  const upcomingEvents = getUpcomingEvents(7);
  const todayEvents = getEventsForDate(today);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isToday = date.toDateString() === todayStr;
    const isTomorrow = date.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString();

    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  };

  const getEventTypeColor = (source) => {
    switch (source) {
      case 'tasks': return 'border-blue-400 bg-blue-50';
      case 'projects': return 'border-purple-400 bg-purple-50';
      case 'bible': return 'border-amber-400 bg-amber-50';
      case 'health': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, x: 20}}
      animate={{opacity: 1, x: 0}}
      transition={{duration: 0.5, delay: 0.2}}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
        <div className="flex items-center space-x-2">
          {googleCalendarConnected && (
            <div className="flex items-center space-x-1">
              <SafeIcon 
                icon={syncStatus === 'syncing' ? FiRefreshCw : FiCloud} 
                className={`w-4 h-4 text-green-600 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} 
              />
              <span className="text-xs text-green-600">Synced</span>
            </div>
          )}
          <button
            onClick={() => navigate('/calendar')}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Today's Summary */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiCalendar} className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Today</h4>
          </div>
          <p className="text-sm text-blue-700">
            {todayEvents.length} event{todayEvents.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 text-sm">Upcoming Events</h4>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border-l-4 ${getEventTypeColor(event.source)}`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900 truncate flex-1 text-sm">
                    {event.title}
                  </h5>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatDate(event.start)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <SafeIcon icon={FiClock} className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(event.start).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {event.source}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4 text-sm">No upcoming events</p>
          )}
        </div>

        {/* Sync Status */}
        {!googleCalendarConnected && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCloud} className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Connect Google Calendar for full sync</span>
            </div>
          </div>
        )}

        {/* Quick Action */}
        <button
          onClick={() => navigate('/calendar')}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiCalendar} className="w-5 h-5" />
          <span className="font-medium">View Full Calendar</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CalendarWidget;