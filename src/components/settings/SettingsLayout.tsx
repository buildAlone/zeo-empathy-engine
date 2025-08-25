import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Info,
  Sliders
} from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import AboutSettings from './AboutSettings';

const settingsSections = [
  { id: 'general', name: 'General', icon: Sliders },
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'privacy', name: 'Privacy & Security', icon: Shield },
  { id: 'about', name: 'About', icon: Info },
];

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState('general');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeo-surface via-background to-zeo-surface">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-muted-foreground">
            Customize your ZEO experience and manage your account
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.div
            className="lg:w-80 w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-strong rounded-2xl p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-zeo-primary">Settings Menu</h2>
              </div>

              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        isActive 
                          ? 'bg-zeo-primary text-white shadow-lg' 
                          : 'text-muted-foreground hover:text-zeo-primary hover:bg-zeo-primary/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-strong rounded-2xl p-6 lg:p-8">
              {renderActiveSection()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}