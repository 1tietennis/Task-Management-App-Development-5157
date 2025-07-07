import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProjectManager from './components/ProjectManager';
import Calendar from './components/Calendar';
import HealthTracker from './components/HealthTracker';
import BibleStudy from './components/BibleStudy';
import FileManager from './components/FileManager';
import AIAssistant from './components/AIAssistant';
import Settings from './components/Settings';
import { TaskProvider } from './context/TaskContext';
import { ProjectProvider } from './context/ProjectContext';
import { HealthProvider } from './context/HealthContext';
import { BibleProvider } from './context/BibleContext';
import { FileProvider } from './context/FileContext';
import { AIProvider } from './context/AIContext';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <TaskProvider>
      <ProjectProvider>
        <HealthProvider>
          <BibleProvider>
            <FileProvider>
              <AIProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Header 
                      sidebarOpen={sidebarOpen} 
                      setSidebarOpen={setSidebarOpen}
                      currentView={currentView}
                    />
                    
                    <div className="flex">
                      <Sidebar 
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                      />
                      
                      <main className="flex-1 p-6 lg:pl-72">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/tasks" element={<TaskList />} />
                            <Route path="/add-task" element={<TaskForm />} />
                            <Route path="/edit-task/:id" element={<TaskForm />} />
                            <Route path="/projects" element={<ProjectManager />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/health" element={<HealthTracker />} />
                            <Route path="/bible-study" element={<BibleStudy />} />
                            <Route path="/files" element={<FileManager />} />
                            <Route path="/ai-assistant" element={<AIAssistant />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                          </Routes>
                        </motion.div>
                      </main>
                    </div>
                    
                    <Toaster 
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                      }}
                    />
                  </div>
                </Router>
              </AIProvider>
            </FileProvider>
          </BibleProvider>
        </HealthProvider>
      </ProjectProvider>
    </TaskProvider>
  );
}

export default App;