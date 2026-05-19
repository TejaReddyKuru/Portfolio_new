import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ThemePuller from './components/ThemePuller';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';


function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-gray-200 transition-colors duration-500">
      <ThemePuller />
      <Navbar />
      <main>
        <Hero />

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Achievements />
        <Education />
        <Gallery />
        <Contact />
      </main>
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-500/50 hover:bg-blue-600/50 transition duration-300 z-50 text-white shadow-lg shadow-blue-500/20"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
