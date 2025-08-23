import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Avatar3D from '@/components/Avatar3D';
import heroImage from '@/assets/hero-avatar.jpg';
import { 
  MessageCircle, 
  Brain, 
  Heart, 
  Shield, 
  Clock, 
  Sparkles,
  ChevronRight,
  Play,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced conversational AI that understands context and provides empathetic responses tailored to your needs."
  },
  {
    icon: Heart,
    title: "Emotional Support",
    description: "Real-time emotion recognition from face and voice to provide personalized mental health support."
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "GDPR and HIPAA compliant with end-to-end encryption. Your conversations remain completely private."
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Your AI companion is always here when you need support, day or night, without judgment."
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Healthcare Professional", 
    content: "ZEO has been a game-changer for my mental wellness routine. The avatar feels so natural and understanding.",
    rating: 5
  },
  {
    name: "James K.",
    role: "College Student",
    content: "Having someone to talk to at 3 AM during anxiety episodes has been life-changing. ZEO really gets it.",
    rating: 5
  },
  {
    name: "Maria L.",
    role: "Working Parent",
    content: "The emotion recognition is incredible. ZEO can tell when I'm stressed and knows exactly what to say.",
    rating: 5
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-zeo-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-zeo-primary" />
                  <span className="text-sm font-medium">AI-Powered Mental Health Companion</span>
                </motion.div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Meet{' '}
                  <span className="gradient-text">ZEO</span>
                  <br />
                  Your 24/7{' '}
                  <span className="gradient-text">AI Companion</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Experience personalized mental health support through real-time emotion recognition 
                  and empathetic AI conversations with a lifelike 3D avatar companion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/session">
                  <Button variant="hero" size="lg" className="group">
                    <MessageCircle className="w-5 h-5" />
                    Start Session
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button variant="glass" size="lg" className="group">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain className="w-4 h-4 text-zeo-primary" />
                  <span>AI-Powered</span>
                </div>
              </div>
            </motion.div>

            {/* Avatar */}
            <motion.div 
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <Avatar3D size="lg" className="drop-shadow-2xl" />
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full glass flex items-center justify-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-6 h-6 text-red-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full glass flex items-center justify-center"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <Brain className="w-6 h-6 text-zeo-secondary" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-zeo-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-zeo-secondary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zeo-neutral/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Advanced AI Technology for{' '}
              <span className="gradient-text">Mental Wellness</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of mental health support with cutting-edge emotion recognition 
              and personalized AI conversations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group p-6 rounded-xl glass hover:glass-strong transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Trusted by thousands of users
            </h2>
            <p className="text-xl text-muted-foreground">
              See what people are saying about their ZEO experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="p-6 rounded-xl glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zeo-neutral/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="space-y-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to start your journey to{' '}
              <span className="gradient-text">better mental health</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Join thousands of users who have found support and comfort with ZEO. 
              Your AI companion is ready to help you thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/session">
                <Button variant="hero" size="lg" className="group">
                  <MessageCircle className="w-5 h-5" />
                  Start Your First Session
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="glass" size="lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}