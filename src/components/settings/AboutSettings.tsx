import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Heart, Users, Globe, Github, Mail, Phone, MessageCircle } from 'lucide-react';

export default function AboutSettings() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <Info className="w-6 h-6 text-zeo-primary" />
        <h3 className="text-2xl font-bold text-zeo-primary">About ZEO</h3>
      </div>

      {/* App Information */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">Z</span>
          </div>
          <CardTitle className="text-3xl">
            <span className="gradient-text">ZEO</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Your AI-Powered Empathy Engine
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center space-x-4 text-sm">
            <Badge variant="secondary">Version 1.0.0</Badge>
            <Badge variant="secondary">Beta</Badge>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ZEO is an advanced AI companion designed to provide empathetic support and mental health assistance. 
            Using cutting-edge emotion recognition and natural language processing, ZEO offers personalized 
            therapy sessions to help you navigate life's challenges.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Key Features</span>
          </CardTitle>
          <CardDescription>
            What makes ZEO special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-zeo-primary">Real-time Emotion Recognition</h4>
              <p className="text-sm text-muted-foreground">Advanced AI analyzes your expressions and voice to understand your emotional state.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-zeo-primary">Personalized Therapy</h4>
              <p className="text-sm text-muted-foreground">Tailored sessions based on your unique needs and progress.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-zeo-primary">3D Avatar Interaction</h4>
              <p className="text-sm text-muted-foreground">Immersive conversations with a lifelike AI companion.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-zeo-primary">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground">Monitor your mental health journey with detailed analytics.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Our Team</span>
          </CardTitle>
          <CardDescription>
            The people behind ZEO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            ZEO is developed by a dedicated team of mental health professionals, AI researchers, 
            and software engineers committed to making mental health support accessible to everyone.
          </p>
          
          <div className="text-sm text-muted-foreground">
            <p>• Clinical Psychology Consultants</p>
            <p>• AI/ML Engineers</p>
            <p>• UX/UI Designers</p>
            <p>• Software Developers</p>
          </div>
        </CardContent>
      </Card>

      {/* Support & Contact */}
      <Card className="glass border-zeo-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Support & Contact</span>
          </CardTitle>
          <CardDescription>
            Get help or reach out to us
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Crisis Hotline</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Help Center</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <span>Report Issue</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card className="glass border-zeo-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Button variant="link" className="p-0 h-auto text-zeo-primary">Privacy Policy</Button>
              <Button variant="link" className="p-0 h-auto text-zeo-primary">Terms of Service</Button>
              <Button variant="link" className="p-0 h-auto text-zeo-primary">Licenses</Button>
              <Button variant="link" className="p-0 h-auto text-zeo-primary">Acknowledgments</Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2024 ZEO AI. All rights reserved. Made with ❤️ for mental health.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}