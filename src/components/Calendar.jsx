import React, {useState} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useCalendar} from '../context/CalendarContext';
import toast from 'react-hot-toast';

const {FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiPlus, FiRefreshCw, FiSettings, FiCloud, FiWifi, FiWifiOff} = FiIcons;

const Calendar = () => {
  const {
    events,
    googleCalendarConnected,
    syncStatus,
    lastSync,
    loading,
    connectGoogleCalendar,
    disconnectGoogleCalendar,
    syncAllSystems,
    getEventsForDate,
    addEvent
  } = useCalendar();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    type: 'personal'
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  const handleSync = async () => {
    if (!googleCalendarConnected) {
      await connectGoogleCalendar();
    } else {
      await syncAllSystems();
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start) {
      toast.error('Please fill in required fields');
      return;
    }

    addEvent({
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end || newEvent.start)
    });

    setNewEvent({title: '', description: '', start: '', end: '', type: 'personal'});
    setShowAddEventModal(false);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
          } ${isToday ? 'bg-blue-100' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
          {dayEvents.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div
                  key={index}
                  className="text-xs px-1 py-0.5 rounded truncate"
                  style={{backgroundColor: event.color + '20', color: event.color}}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected': return 'text-green-600';
      case 'syncing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected': return FiWifi;
      case 'syncing': return FiRefreshCw;
      case 'error': return FiWifiOff;
      default: return FiWifiOff;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-1">Unified calendar with Google sync</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              googleCalendarConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <SafeIcon icon={getSyncStatusIcon()} className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              <span>{syncStatus === 'connected' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Not Connected'}</span>
            </div>
            <button
              onClick={handleSync}
              disabled={loading || syncStatus === 'syncing'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={googleCalendarConnected ? FiRefreshCw : FiCloud} className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>{googleCalendarConnected ? 'Sync Now' : 'Connect Google'}</span>
            </button>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Sync Status */}
        {googleCalendarConnected && lastSync && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCloud} className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Google Calendar Connected
                </span>
              </div>
              <div className="text-sm text-green-600">
                Last sync: {new Date(lastSync).toLocaleTimeString()}
              </div>
            </div>
            <div className="mt-2 text-sm text-green-700">
              Syncing {events.length} events from all systems
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <SafeIcon icon={FiChevronLeft} className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <SafeIcon icon={FiChevronRight} className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiCalendar} className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
              </div>

              <div className="space-y-3">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border-l-4"
                      style={{borderLeftColor: event.color, backgroundColor: event.color + '10'}}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {event.source}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>{new Date(event.start).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-gray-900 mb-1">No events scheduled</h4>
                    <p className="text-sm text-gray-600">This date is free</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Sources Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Sources</h3>
              <div className="space-y-2">
                {[
                  {source: 'tasks', label: 'Tasks', color: '#3b82f6', count: events.filter(e => e.source === 'tasks').length},
                  {source: 'projects', label: 'Projects', color: '#8b5cf6', count: events.filter(e => e.source === 'projects').length},
                  {source: 'bible', label: 'Bible Study', color: '#f59e0b', count: events.filter(e => e.source === 'bible').length},
                  {source: 'health', label: 'Health Goals', color: '#10b981', count: events.filter(e => e.source === 'health').length}
                ].map(item => (
                  <div key={item.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Event</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) => setNewEvent(prev => ({...prev, start: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({...prev, type: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="meeting">Meeting</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Calendar;