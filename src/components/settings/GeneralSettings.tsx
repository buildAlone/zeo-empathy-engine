import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Sliders, Volume2, Moon, Globe } from 'lucide-react';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    darkMode: false,
    volume: [75],
    autoStart: true,
    animations: true,
    soundEffects: true,
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
        <Sliders className="w-6 h-6 text-zeo-primary" />
        <h3 className="text-2xl font-bold text-zeo-primary">General Settings</h3>
      </div>

      {/* Language & Region */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Language & Region</span>
          </CardTitle>
          <CardDescription>
            Configure your language preferences and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="w-5 h-5" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>
            Customize the look and feel of your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Enable Animations</Label>
              <p className="text-sm text-muted-foreground">Show smooth transitions and effects</p>
            </div>
            <Switch
              id="animations"
              checked={settings.animations}
              onCheckedChange={(checked) => handleSettingChange('animations', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <span>Audio Settings</span>
          </CardTitle>
          <CardDescription>
            Control audio preferences and volume levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="volume">Master Volume</Label>
            <Slider
              id="volume"
              min={0}
              max={100}
              step={1}
              value={settings.volume}
              onValueChange={(value) => handleSettingChange('volume', value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">{settings.volume[0]}%</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="soundEffects">Sound Effects</Label>
              <p className="text-sm text-muted-foreground">Play interaction sounds</p>
            </div>
            <Switch
              id="soundEffects"
              checked={settings.soundEffects}
              onCheckedChange={(checked) => handleSettingChange('soundEffects', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Session Settings */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle>Session Preferences</CardTitle>
          <CardDescription>
            Configure how your therapy sessions behave
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoStart">Auto-start Sessions</Label>
              <p className="text-sm text-muted-foreground">Automatically begin sessions when available</p>
            </div>
            <Switch
              id="autoStart"
              checked={settings.autoStart}
              onCheckedChange={(checked) => handleSettingChange('autoStart', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="default" size="lg" className="bg-zeo-primary hover:bg-zeo-secondary text-white">
          Save All Settings
        </Button>
      </div>
    </motion.div>
  );
}