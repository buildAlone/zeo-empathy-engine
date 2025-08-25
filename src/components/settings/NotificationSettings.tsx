import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageSquare, Calendar, Smartphone } from 'lucide-react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    weeklyReports: true,
    emergencyAlerts: true,
    chatMessages: true,
    moodCheckIns: true,
    reminderFrequency: 'daily',
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="w-6 h-6 text-zeo-primary" />
        <h3 className="text-2xl font-bold text-zeo-primary">Notification Settings</h3>
      </div>

      {/* Email Notifications */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>
            Manage email notifications for important updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important updates via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weeklyReports">Weekly Progress Reports</Label>
              <p className="text-sm text-muted-foreground">Get weekly summaries of your progress</p>
            </div>
            <Switch
              id="weeklyReports"
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
              <p className="text-sm text-muted-foreground">Critical safety notifications</p>
            </div>
            <Switch
              id="emergencyAlerts"
              checked={settings.emergencyAlerts}
              onCheckedChange={(checked) => handleSettingChange('emergencyAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Push Notifications</span>
          </CardTitle>
          <CardDescription>
            Configure mobile and desktop push notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushNotifications">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="chatMessages">Chat Messages</Label>
              <p className="text-sm text-muted-foreground">Notifications for new chat messages</p>
            </div>
            <Switch
              id="chatMessages"
              checked={settings.chatMessages}
              onCheckedChange={(checked) => handleSettingChange('chatMessages', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Session Reminders */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Session Reminders</span>
          </CardTitle>
          <CardDescription>
            Set up reminders for your therapy sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sessionReminders">Session Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
            </div>
            <Switch
              id="sessionReminders"
              checked={settings.sessionReminders}
              onCheckedChange={(checked) => handleSettingChange('sessionReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="moodCheckIns">Mood Check-ins</Label>
              <p className="text-sm text-muted-foreground">Reminders to log your daily mood</p>
            </div>
            <Switch
              id="moodCheckIns"
              checked={settings.moodCheckIns}
              onCheckedChange={(checked) => handleSettingChange('moodCheckIns', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderFrequency">Reminder Frequency</Label>
            <Select value={settings.reminderFrequency} onValueChange={(value) => handleSettingChange('reminderFrequency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="every-other-day">Every other day</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>
            Set times when you don't want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="quietHours">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">Silence notifications during specific times</p>
            </div>
            <Switch
              id="quietHours"
              checked={settings.quietHours}
              onCheckedChange={(checked) => handleSettingChange('quietHours', checked)}
            />
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <Select value={settings.quietStart} onValueChange={(value) => handleSettingChange('quietStart', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <Select value={settings.quietEnd} onValueChange={(value) => handleSettingChange('quietEnd', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="default" size="lg" className="bg-zeo-primary hover:bg-zeo-secondary text-white">
          Save Notification Settings
        </Button>
      </div>
    </motion.div>
  );
}