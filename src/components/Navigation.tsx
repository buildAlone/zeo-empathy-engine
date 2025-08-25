import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Video, 
  BarChart3, 
  Settings, 
  User, 
  Phone,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Session', href: '/session', icon: Video },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold gradient-text">ZEO</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative group"
                  >
                    <motion.div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'text-zeo-primary' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.div>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-zeo-primary/10 rounded-lg border border-zeo-primary/20"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Link to="/session">
                <Button variant="hero" size="sm">
                  Start Session
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden glass-strong border-t border-border/10 ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-zeo-primary/10 text-zeo-primary border border-zeo-primary/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-border/10 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Sign In
              </Button>
              <Link to="/session" onClick={() => setIsOpen(false)}>
                <Button variant="hero" className="w-full">
                  Start Session
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  );
}