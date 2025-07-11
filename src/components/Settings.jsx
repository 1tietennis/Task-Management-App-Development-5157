import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useCalendar} from '../context/CalendarContext';
import toast from 'react-hot-toast';

const {FiSettings, FiBell, FiUser, FiShield, FiMoon, FiSmartphone, FiCloud, FiSave, FiCalendar, FiRefreshCw} = FiIcons;

const Settings = () => {
  const {
    googleCalendarConnected,
    syncStatus,
    calendarSettings,
    connectGoogleCalendar,
    disconnectGoogleCalendar,
    updateSettings
  } = useCalendar();

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      taskReminders: true,
      healthReminders: false,
      bibleStudyReminders: true
    },
    theme: 'light',
    language: 'en',
    androidHealthSync: false,
    googleDriveSync: false,
    aiFeatures: true,
    privacy: {
      shareData: false,
      analytics: true
    }
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleCalendarSettingChange = (key, value) => {
    updateSettings({[key]: value});
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleGoogleCalendarToggle = () => {
    if (googleCalendarConnected) {
      disconnectGoogleCalendar();
    } else {
      connectGoogleCalendar();
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
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Customize your LifeFlow experience</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Integration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Calendar Integration</h3>
            </div>
            
            {/* Google Calendar Connection */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Google Calendar</label>
                  <p className="text-xs text-gray-500">
                    Sync events across all systems
                  </p>
                </div>
                <button
                  onClick={handleGoogleCalendarToggle}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    googleCalendarConnected
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {googleCalendarConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {googleCalendarConnected && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCloud} className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Status: {syncStatus === 'connected' ? 'Connected' : syncStatus === 'syncing' ? 'Syncing...' : 'Error'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Sync Settings */}
            {googleCalendarConnected && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium text-gray-700">Sync Settings</h4>
                {[
                  {key: 'syncTasks', label: 'Sync Tasks', desc: 'Include task deadlines in calendar'},
                  {key: 'syncProjects', label: 'Sync Projects', desc: 'Include project deadlines in calendar'},
                  {key: 'syncBibleStudy', label: 'Sync Bible Study', desc: 'Include study sessions in calendar'},
                  {key: 'syncHealth', label: 'Sync Health Goals', desc: 'Include health goal deadlines in calendar'},
                  {key: 'autoSync', label: 'Auto Sync', desc: 'Automatically sync when data changes'}
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                      <p className="text-xs text-gray-500">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => handleCalendarSettingChange(setting.key, !calendarSettings[setting.key])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        calendarSettings[setting.key] ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          calendarSettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiBell} className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <button
                    onClick={() => handleSettingChange('notifications', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiMoon} className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings(prev => ({...prev, theme: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiSmartphone} className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Android Health Sync</label>
                  <p className="text-xs text-gray-500">Sync steps, weight, and fitness data</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({...prev, androidHealthSync: !prev.androidHealthSync}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.androidHealthSync ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.androidHealthSync ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Google Drive Sync</label>
                  <p className="text-xs text-gray-500">Backup files and data to cloud</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({...prev, googleDriveSync: !prev.googleDriveSync}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.googleDriveSync ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.googleDriveSync ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">AI Features</label>
                  <p className="text-xs text-gray-500">Enable AI-powered insights and suggestions</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({...prev, aiFeatures: !prev.aiFeatures}))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.aiFeatures ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.aiFeatures ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SafeIcon icon={FiShield} className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <p className="text-xs text-gray-500">
                      {key === 'shareData' ? 'Share anonymous usage data' : 'Enable analytics tracking'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('privacy', key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <SafeIcon icon={FiUser} className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Account</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Export</h4>
              <p className="text-sm text-gray-600">Download all your data in JSON format</p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;