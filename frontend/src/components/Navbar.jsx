import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon } from 'lucide-react';

const leftSections = ['Home', 'About', 'Skills'];
const rightSections = ['Projects', 'Live Projects', 'Experience', 'Contact'];
const allSections = [...leftSections, ...rightSections];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const current = allSections.find(section => {
        const targetId = section === 'Live Projects' ? 'projects' : section.toLowerCase();
        const element = document.getElementById(targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 200;
        }
        return false;
      });
      if (current) setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const targetId = section === 'Live Projects' ? 'projects' : section.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActive(section);
    setIsOpen(false);
    
    if (section === 'Live Projects') {
       window.dispatchEvent(new CustomEvent('filterProjects', { detail: 'Live Projects' }));
    } else if (section === 'Projects') {
       window.dispatchEvent(new CustomEvent('filterProjects', { detail: 'All' }));
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-hidden ${scrolled ? 'bg-white/90 dark:bg-black/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-xl py-2' : 'bg-white/50 dark:bg-black/50 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Desktop Left Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {leftSections.map((item) => (
            <button
              key={item}
              className={`text-sm font-black tracking-[0.1em] uppercase transition-all duration-300 ${active === item ? 'text-peach' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Centered Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => scrollToSection('Home')}
        >
          <div className="w-10 h-10 peach-gradient rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(251,146,60,0.3)] group-hover:rotate-12 transition-transform duration-300">
            <Hexagon size={24} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
            TEJA<span className="text-peach">REDDY</span>
          </span>
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {rightSections.map((item) => (
            <button
              key={item}
              className={`text-sm font-black tracking-[0.1em] uppercase transition-all duration-300 ${active === item ? 'text-peach' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}

          <button 
             onClick={() => scrollToSection('Contact')}
             className="px-6 py-2 peach-gradient text-white rounded-full text-sm font-black shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:scale-105 transition-transform"
          >
            Hire me
          </button>
          <a 
            href="assets/cv/teja_cv.pdf" 
            download
            className="px-4 py-2 border border-white/20 text-white rounded-full text-xs font-bold hover:bg-white/10 transition-colors"
          >
            CV
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black border-b border-white/10"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {allSections.map((item) => (
                 <button
                 key={item}
                 className={`text-left text-xl font-bold transition-colors ${active === item ? 'text-peach' : 'text-gray-400'}`}
                 onClick={() => scrollToSection(item)}
               >
                 {item}
               </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

  );
}

