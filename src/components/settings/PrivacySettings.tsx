import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Eye, Database, Trash2, Download, AlertTriangle } from 'lucide-react';

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    dataCollection: true,
    analyticsTracking: false,
    sessionRecording: true,
    shareProgress: false,
    publicProfile: false,
    dataRetention: '1year',
    encryptData: true,
    twoFactorAuth: false,
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
        <Shield className="w-6 h-6 text-zeo-primary" />
        <h3 className="text-2xl font-bold text-zeo-primary">Privacy & Security</h3>
      </div>

      {/* Security */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Account Security</span>
          </CardTitle>
          <CardDescription>
            Protect your account with advanced security features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encryptData">End-to-End Encryption</Label>
              <p className="text-sm text-muted-foreground">Encrypt all your data for maximum security</p>
            </div>
            <Switch
              id="encryptData"
              checked={settings.encryptData}
              onCheckedChange={(checked) => handleSettingChange('encryptData', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of account protection</p>
            </div>
            <Switch
              id="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
            />
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Data Privacy</span>
          </CardTitle>
          <CardDescription>
            Control how your data is collected and used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataCollection">Essential Data Collection</Label>
              <p className="text-sm text-muted-foreground">Required for core functionality</p>
            </div>
            <Switch
              id="dataCollection"
              checked={settings.dataCollection}
              onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
              disabled
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analyticsTracking">Analytics & Usage Tracking</Label>
              <p className="text-sm text-muted-foreground">Help us improve the app with anonymous usage data</p>
            </div>
            <Switch
              id="analyticsTracking"
              checked={settings.analyticsTracking}
              onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sessionRecording">Session Recording</Label>
              <p className="text-sm text-muted-foreground">Record sessions for progress tracking</p>
            </div>
            <Switch
              id="sessionRecording"
              checked={settings.sessionRecording}
              onCheckedChange={(checked) => handleSettingChange('sessionRecording', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Profile Visibility</span>
          </CardTitle>
          <CardDescription>
            Control who can see your information and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="publicProfile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
            </div>
            <Switch
              id="publicProfile"
              checked={settings.publicProfile}
              onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="shareProgress">Share Progress</Label>
              <p className="text-sm text-muted-foreground">Allow sharing of anonymous progress data</p>
            </div>
            <Switch
              id="shareProgress"
              checked={settings.shareProgress}
              onCheckedChange={(checked) => handleSettingChange('shareProgress', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Download or delete your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download My Data</span>
            </Button>
            
            <Button variant="destructive" className="flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Account deletion is permanent and cannot be undone. All your data will be permanently removed.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="default" size="lg" className="bg-zeo-primary hover:bg-zeo-secondary text-white">
          Save Privacy Settings
        </Button>
      </div>
    </motion.div>
  );
}