import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Avatar3DRectangle from '@/components/Avatar3DRectangle';
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
  { type: 'avatar', name: 'ZEO', content: "Hello! I'm ZEO, your AI companion. How are you feeling today?" },
  { type: 'user', name: 'You', content: "I've been feeling a bit anxious lately about work." },
  { type: 'avatar', name: 'ZEO', content: "I understand that work can be overwhelming. It's completely normal to feel anxious about it. Can you tell me more about what specifically is causing you stress?" }
];

export default function Session() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [detectedEmotion, setDetectedEmotion] = useState<keyof typeof emotionIcons>('calm');
  const [showChat, setShowChat] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
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
          video: { width: 1280, height: 720 }, 
          audio: { echoCancellation: true, noiseSuppression: true } 
        });
        setVideoStream(stream);
      }
      setIsSessionActive(true);
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      // Start session without camera for demo
      setIsSessionActive(true);
    }
  };

  const endSession = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setIsSessionActive(false);
  };

  const EmotionIcon = emotionIcons[detectedEmotion];

  if (!isSessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zeo-surface via-background to-zeo-surface px-4">
        <motion.div
          className="text-center space-y-8 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <Avatar3DRectangle size="lg" className="mx-auto" />
            <motion.div
              className="absolute -inset-4 rounded-3xl border-2 border-zeo-primary/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              Ready to connect with{' '}
              <span className="gradient-text">ZEO</span>?
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
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
              <Video className="w-4 h-4 md:w-5 md:h-5" />
              Start Session
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-muted-foreground">
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
      <div className={`flex h-screen ${showChat ? 'lg:pr-96' : ''} transition-all duration-300`}>
        {/* Two Avatars Side by Side */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center relative p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-16">
          {/* AI Avatar (Left/Top) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Emotion Aura */}
            <motion.div
              className={`absolute -inset-8 rounded-3xl ${EmotionIcon.bg} blur-2xl`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <Avatar3DRectangle size="lg" isActive={true} />

            {/* AI Label */}
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full glass-strong border border-zeo-primary/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-zeo-primary" />
                <span className="text-sm font-medium">ZEO AI</span>
              </div>
            </motion.div>

            {/* Voice Activity Indicator */}
            <AnimatePresence>
              {isMicOn && (
                <motion.div
                  className="absolute -top-8 -right-8 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-zeo-primary/20 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Volume2 className="w-4 h-4 lg:w-6 lg:h-6 text-zeo-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* User Avatar (Right/Bottom) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Avatar3DRectangle 
              size="lg" 
              isActive={true} 
              isUser={true} 
              videoStream={videoStream}
            />

            {/* Emotion Detection Overlay */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 glass-strong rounded-full px-3 py-1">
              <EmotionIcon.icon className={`w-4 h-4 ${EmotionIcon.color}`} />
              <span className="text-xs font-medium text-zeo-primary capitalize">{detectedEmotion}</span>
            </div>

            {/* User Label */}
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full glass-strong border border-border/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-zeo-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">You</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Controls */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-zeo-glass/90 backdrop-blur-lg border-t border-border/20 p-4 lg:p-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-center space-x-3 lg:space-x-6 max-w-2xl mx-auto">
          <Button
            variant={isMicOn ? "default" : "destructive"}
            size="lg"
            onClick={() => setIsMicOn(!isMicOn)}
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          >
            {isMicOn ? <Mic className="w-4 h-4 lg:w-6 lg:h-6" /> : <MicOff className="w-4 h-4 lg:w-6 lg:h-6" />}
          </Button>
          
          <Button
            variant={isCameraOn ? "default" : "destructive"}
            size="lg"
            onClick={() => setIsCameraOn(!isCameraOn)}
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          >
            {isCameraOn ? <Video className="w-4 h-4 lg:w-6 lg:h-6" /> : <VideoOff className="w-4 h-4 lg:w-6 lg:h-6" />}
          </Button>

          <Button
            variant="glass"
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          >
            <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6" />
          </Button>
          
          <Button 
            variant="glass" 
            size="lg"
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
          >
            <Settings className="w-4 h-4 lg:w-6 lg:h-6" />
          </Button>
          
          <Button 
            variant="destructive" 
            size="lg"
            className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
            onClick={endSession}
          >
            <PhoneOff className="w-4 h-4 lg:w-6 lg:h-6" />
          </Button>
        </div>
      </motion.div>

      {/* Right Side Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full lg:w-96 bg-zeo-glass/95 backdrop-blur-lg border-l border-border/20 p-4 lg:p-6 flex flex-col z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-zeo-primary">Chat History</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                ×
              </Button>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-xs text-muted-foreground mb-1 px-1">
                    {message.name}
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-zeo-primary text-white rounded-br-md' 
                      : 'glass border border-border/20 text-zeo-primary rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Auto-transcript indicator */}
            <div className="text-xs text-muted-foreground text-center p-3 glass rounded-xl border border-border/20">
              🎤 All conversations are automatically transcribed and stored securely
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