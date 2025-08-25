import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Mail, MapPin, Calendar, Award, Clock } from 'lucide-react';
import Avatar3DRectangle from '@/components/Avatar3DRectangle';

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Mental health advocate and technology enthusiast. Working on improving my emotional well-being through AI-assisted therapy.',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2024'
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-zeo-primary" />
          <h3 className="text-2xl font-bold text-zeo-primary">Profile Settings</h3>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "bg-zeo-primary hover:bg-zeo-secondary text-white" : ""}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="glass border-zeo-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <Avatar3DRectangle size="lg" isActive={true} />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-zeo-primary mb-2">{profile.name}</h2>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </p>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start space-x-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinDate}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-zeo-primary/20">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={4}
                className="bg-background/50"
              />
            </div>

            {isEditing && (
              <Button 
                onClick={handleSave} 
                className="w-full bg-zeo-primary hover:bg-zeo-secondary text-white"
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="glass border-zeo-primary/20">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>
              Your activity and achievements on ZEO
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-zeo-primary">24</div>
                <div className="text-sm text-muted-foreground">Sessions</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-zeo-primary">48h</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-zeo-primary">12</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-zeo-primary">8.7</div>
                <div className="text-sm text-muted-foreground">Mood Score</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-zeo-primary flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Recent Achievements</span>
              </h4>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2 mb-2">First Session Complete</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Week Warrior</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Mood Tracker</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Consistency Champion</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-zeo-primary flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Recent Activity</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 glass rounded">
                  <span>Completed session</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-2 glass rounded">
                  <span>Updated profile</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex justify-between items-center p-2 glass rounded">
                  <span>Mood check-in</span>
                  <span className="text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}