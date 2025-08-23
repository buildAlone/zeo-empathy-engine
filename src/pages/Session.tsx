import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Avatar3D from '@/components/Avatar3D';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Settings,
  Volume2,
  MessageSquare,
  Heart,
  Brain,
  Smile,
  Frown,
  Meh,
  PhoneOff
} from 'lucide-react';

const emotionIcons = {
  calm: { icon: Meh, color: 'text-emotion-calm', bg: 'bg-emotion-calm/20' },
  happy: { icon: Smile, color: 'text-emotion-happy', bg: 'bg-emotion-happy/20' },
  anxious: { icon: Frown, color: 'text-emotion-anxious', bg: 'bg-emotion-anxious/20' },
  sad: { icon: Frown, color: 'text-emotion-sad', bg: 'bg-emotion-sad/20' },
  excited: { icon: Smile, color: 'text-emotion-excited', bg: 'bg-emotion-excited/20' }
};

const messages = [
  { type: 'avatar', content: "Hello! I'm ZEO, your AI companion. How are you feeling today?" },
  { type: 'user', content: "I've been feeling a bit anxious lately about work." },
  { type: 'avatar', content: "I understand that work can be overwhelming. It's completely normal to feel anxious about it. Can you tell me more about what specifically is causing you stress?" }
];

export default function Session() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [detectedEmotion, setDetectedEmotion] = useState<keyof typeof emotionIcons>('calm');
  const [showChat, setShowChat] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate emotion detection changes
  useEffect(() => {
    if (isSessionActive) {
      const emotions: (keyof typeof emotionIcons)[] = ['calm', 'happy', 'anxious', 'excited'];
      const interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setDetectedEmotion(randomEmotion);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSessionActive]);

  const startSession = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      setIsSessionActive(true);
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      // Start session without camera for demo
      setIsSessionActive(true);
    }
  };

  const endSession = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsSessionActive(false);
  };

  const EmotionIcon = emotionIcons[detectedEmotion];

  if (!isSessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zeo-surface via-background to-zeo-surface">
        <motion.div
          className="text-center space-y-8 max-w-md mx-auto px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <Avatar3D size="lg" className="mx-auto" />
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-zeo-primary/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Ready to connect with{' '}
              <span className="gradient-text">ZEO</span>?
            </h1>
            <p className="text-muted-foreground">
              I'll need access to your camera and microphone to provide the best support experience.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full group"
              onClick={startSession}
            >
              <Video className="w-5 h-5" />
              Start Session
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Empathetic AI</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-zeo-primary" />
                <span>Emotion Recognition</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeo-surface via-background to-zeo-surface relative overflow-hidden">
      {/* Main Session Interface */}
      <div className="grid lg:grid-cols-3 h-screen">
        {/* Avatar Section */}
        <div className="lg:col-span-2 flex items-center justify-center relative p-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Emotion Aura */}
            <motion.div
              className={`absolute -inset-8 rounded-full ${EmotionIcon.bg} blur-2xl`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Avatar3D size="lg" isActive={true} />

            {/* Emotion Indicator */}
            <motion.div
              className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full glass-strong border ${EmotionIcon.bg} border-opacity-30`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <EmotionIcon.icon className={`w-4 h-4 ${EmotionIcon.color}`} />
                <span className="text-sm font-medium capitalize">{detectedEmotion}</span>
              </div>
            </motion.div>

            {/* Voice Activity Indicator */}
            <AnimatePresence>
              {isMicOn && (
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-zeo-primary/20 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Volume2 className="w-6 h-6 text-zeo-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* User Video & Controls */}
        <div className="lg:col-span-1 bg-zeo-neutral/10 backdrop-blur-sm border-l border-border/10 flex flex-col">
          {/* User Video */}
          <div className="flex-1 p-6">
            <div className="relative rounded-xl overflow-hidden bg-zeo-glass h-64 lg:h-80">
              {isCameraOn ? (
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <VideoOff className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              
              {/* Emotion Detection Overlay */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${EmotionIcon.bg.replace('/20', '')} animate-pulse`} />
                <span className="text-sm font-medium text-white">Analyzing emotion...</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-t border-border/10">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                variant={isMicOn ? "default" : "destructive"}
                onClick={() => setIsMicOn(!isMicOn)}
                className="flex items-center justify-center"
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={isCameraOn ? "default" : "destructive"}
                onClick={() => setIsCameraOn(!isCameraOn)}
                className="flex items-center justify-center"
              >
                {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </Button>
            </div>

            <div className="space-y-3">
              <Button
                variant="glass"
                className="w-full justify-start"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="w-4 h-4" />
                Chat History
              </Button>
              
              <Button variant="glass" className="w-full justify-start">
                <Settings className="w-4 h-4" />
                Session Settings
              </Button>
              
              <Button variant="crisis" className="w-full justify-start">
                <Phone className="w-4 h-4" />
                Crisis Support
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={endSession}
              >
                <PhoneOff className="w-4 h-4" />
                End Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed inset-x-0 bottom-0 h-96 glass-strong border-t border-border/20 p-6"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Conversation History</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4 overflow-y-auto h-60">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-zeo-primary text-white' 
                      : 'glass border border-border/20'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zeo-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-zeo-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}