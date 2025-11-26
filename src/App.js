import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Volume2, VolumeX, Github, Linkedin, Mail, Download, ExternalLink, Briefcase, GraduationCap, Award, Terminal, Phone, Zap, Sparkles, Camera, Menu, X } from 'lucide-react';

/* 
==============================================
FILE PLACEMENT
==============================================
public/
├── photo.jpg           (profile picture - 500x500px recommended)
├── resume.pdf          (RESUME PDF - PLACE IT HERE!)
├── music.mp3           (Main background music)
├── exclusive.mp3       (Hacker mode secret song)
├── lofi.mp3           (Ambient/lofi mode music)
├── magicmode.mp3      (Magic mode sound effects)
├── gallery/
│   ├── photo1.jpg     (Gallery images)
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg
==============================================
*/

export default function Portfolio() {
  // ============= STATE MANAGEMENT =============
  const [darkMode, setDarkMode] = useState(true);
  const [nerdMode, setNerdMode] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [magicMode, setMagicMode] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [lofiMode, setLofiMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [sparkles, setSparkles] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const audioRef = useRef(null);
  const hackerAudioRef = useRef(null);
  const lofiAudioRef = useRef(null);
  const magicAudioRef = useRef(null);
  
  const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Discord Bot Creator', 'Problem Solver', 'Tech Innovator'];
  const [roleIndex, setRoleIndex] = useState(0);

  // ============= LOADING SCREEN EFFECT =============
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // ============= TYPING ANIMATION =============
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [roleIndex]);

  // ============= MOUSE TRACKING =============
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (magicMode) {
        addSparkle(e.clientX, e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [magicMode]);

  // ============= SMART NAVBAR =============
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // ============= MAGIC MODE SPARKLES =============
  const addSparkle = (x, y) => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 20 + 10
    };
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  // ============= MINI GAME - REMOVED =============

  // ============= MUSIC CONTROLS =============
  const toggleMusic = () => {
    if (lofiMode) {
      if (lofiAudioRef.current) {
        lofiAudioRef.current.pause();
        setLofiMode(false);
      }
    }
    if (hackerMode && hackerAudioRef.current) {
      if (musicPlaying) {
        hackerAudioRef.current.pause();
      } else {
        hackerAudioRef.current.play();
      }
    } else if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setMusicPlaying(!musicPlaying);
  };

  const toggleLofi = () => {
    if (musicPlaying && audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
    if (hackerMode && hackerAudioRef.current) {
      hackerAudioRef.current.pause();
    }
    if (lofiAudioRef.current) {
      if (lofiMode) {
        lofiAudioRef.current.pause();
      } else {
        lofiAudioRef.current.play();
      }
      setLofiMode(!lofiMode);
    }
  };

  const activateHackerMode = () => {
    setHackerMode(!hackerMode);
    if (!hackerMode) {
      setDarkMode(true);
      if (musicPlaying && audioRef.current) {
        audioRef.current.pause();
      }
      if (hackerAudioRef.current) {
        hackerAudioRef.current.play();
        setMusicPlaying(true);
      }
    } else {
      if (hackerAudioRef.current) {
        hackerAudioRef.current.pause();
        setMusicPlaying(false);
      }
    }
  };

  const toggleMagicMode = () => {
    setMagicMode(!magicMode);
    if (!magicMode && magicAudioRef.current) {
      magicAudioRef.current.play();
    } else if (magicAudioRef.current) {
      magicAudioRef.current.pause();
      magicAudioRef.current.currentTime = 0;
    }
  };

  // ============= DATA =============
  const projects = [
    // UPDATE THESE LINKS WITH YOUR ACTUAL PROJECT URLs!
    {
      title: "Fischl - Discord Bot",
      description: "A feature-rich Discord bot serving 200,000+ users with 99.9% uptime. Includes ticket management, event coordination, and real-time analytics dashboard.",
      tech: ["Python", "Discord.py", "Flask", "Firebase", "Prometheus", "Grafana"],
      icon: "🤖",
      color: "from-blue-500 to-purple-500",
      live: "https://discord.com/oauth2/authorize?client_id=732422232273584198",
      github: "https://github.com/nishankuprety/Fischl"
    },
    {
      title: "Medical Image Inpainting",
      description: "IEEE published research combining UNET and GAN for specular reflection detection in colposcopy images.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "GANs"],
      icon: "🔬",
      color: "from-green-500 to-teal-500",
      live: "https://ieeexplore.ieee.org/document/2025IEEECONECCT-1881",
      github: "https://github.com/nishankuprety/detection-and-inpainting-of-SR-regions-in-colpscopic-images"
    },
    {
      title: "Downtown Restro Website",
      description: "Full-stack restaurant website with QR-based digital menu system. Self-hosted on local server.",
      tech: ["React", "Node.js", "PHP", "MySQL"],
      icon: "🍽️",
      color: "from-orange-500 to-red-500",
      live: "https://downtownrestro.com",
      github: "https://github.com/nishankuprety/Downtown"
    },
    {
      title: "Snake Game",
      description: "Classic snake game built with vanilla JavaScript. Features smooth controls and progressive difficulty.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      icon: "🐍",
      color: "from-pink-500 to-purple-500",
      live: "https://nishankuprety.github.io/snakegame/",
      github: "https://github.com/nishankuprety/snakegame"
    }
  ];

  const galleryImages = [
    { src: "/gallery/photo1.jpg", title: "Coding Sessions" },
    { src: "/gallery/photo2.jpg", title: "Team Projects" },
    { src: "/gallery/photo3.jpg", title: "Hackathons" },
    { src: "/gallery/photo4.jpg", title: "Tech Events" }
  ];

  // ============= LOADING SCREEN COMPONENT =============
  if (loading) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Terminal className={`${darkMode ? 'text-green-400' : 'text-green-600'} mb-8 animate-pulse`} size={64} />
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className={`mt-4 font-mono ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          {loadingProgress < 30 && '> Initializing...'}
          {loadingProgress >= 30 && loadingProgress < 60 && '> Loading modules...'}
          {loadingProgress >= 60 && loadingProgress < 90 && '> Compiling assets...'}
          {loadingProgress >= 90 && '> Ready!'}
        </p>
      </div>
    );
  }

  // ============= MAIN RENDER =============
  return (
    <div className={`min-h-screen transition-all duration-500 ${
      hackerMode 
        ? 'bg-black' 
        : lofiMode
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
        : darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    } ${nerdMode ? 'font-mono' : ''} ${magicMode ? 'cursor-none' : ''}`}>
      
      {/* ============= ANIMATED BACKGROUND ============= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {hackerMode && (
          <div className="absolute inset-0 opacity-20">
            <div className="text-green-500 text-xs leading-tight overflow-hidden h-full animate-pulse">
              {Array(50).fill('01010101 ').map((code, i) => (
                <div key={i} className="whitespace-nowrap">{code.repeat(100)}</div>
              ))}
            </div>
          </div>
        )}
        <div 
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${
            hackerMode ? 'bg-green-500' : darkMode ? 'bg-purple-500' : 'bg-blue-400'
          }`}
          style={{ left: `${mousePosition.x / 20}px`, top: `${mousePosition.y / 20}px` }}
        />
      </div>

      {/* ============= SPARKLES (MAGIC MODE) ============= */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animation: 'sparkle 1s ease-out forwards'
          }}
        >
          <Sparkles className="text-yellow-400" size={sparkle.size} />
        </div>
      ))}

      {/* ============= GAME ICONS - REMOVED ============= */}

      {/* ============= SMART STICKY NAVBAR ============= */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        hackerMode 
          ? 'bg-black/80 border-b border-green-500' 
          : darkMode 
          ? 'bg-gray-900/50 border-b border-purple-500/20' 
          : 'bg-white/50 border-b border-purple-200'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Terminal className={`${hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={28} />
              <h1 className={`text-2xl font-bold ${hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                {nerdMode ? 'NiShAnK' : 'Nishank'}
              </h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'gallery', 'resume'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`capitalize font-medium transition-all duration-300 hover:scale-110 ${
                    activeSection === section
                      ? hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                      : hackerMode ? 'text-green-600 hover:text-green-400' : darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center space-x-2">
              {/* Magic Mode */}
              <button
                onClick={toggleMagicMode}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  magicMode 
                    ? 'bg-yellow-500 text-white animate-pulse' 
                    : darkMode ? 'bg-purple-500/20 text-yellow-400' : 'bg-purple-100 text-purple-600'
                }`}
                title="Magic Mode"
              >
                <Sparkles size={20} />
              </button>

              {/* Lofi Mode */}
              <button
                onClick={toggleLofi}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  lofiMode 
                    ? 'bg-indigo-500 text-white' 
                    : darkMode ? 'bg-purple-500/20 text-indigo-400' : 'bg-purple-100 text-purple-600'
                }`}
                title="Lofi Ambient Mode"
              >
                🎧
              </button>

              {/* Nerd Mode */}
              <button
                onClick={() => setNerdMode(!nerdMode)}
                className={`hidden sm:block p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  nerdMode 
                    ? 'bg-blue-500 text-white' 
                    : darkMode ? 'bg-purple-500/20 text-blue-400' : 'bg-purple-100 text-purple-600'
                }`}
                title="Nerd Mode"
              >
                🤓
              </button>

              {/* Hacker Mode (Easter Egg) */}
              <button
                onClick={activateHackerMode}
                onDoubleClick={activateHackerMode}
                className={`hidden sm:block p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  hackerMode 
                    ? 'bg-green-500 text-black animate-pulse' 
                    : 'bg-gray-800 text-green-400'
                }`}
                title="Double-click for Hacker Mode"
              >
                👾
              </button>

              {/* Music */}
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-purple-100 text-purple-600'
                }`}
              >
                {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              {/* Theme */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-purple-500/20 text-yellow-400' : 'bg-purple-100 text-purple-600'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden backdrop-blur-md ${
            hackerMode ? 'bg-black/90 border-b border-green-500' : darkMode ? 'bg-gray-900/90' : 'bg-white/90'
          }`}>
            <div className="container mx-auto px-4 sm:px-6 py-4 space-y-4">
              {['home', 'about', 'projects', 'gallery', 'resume'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left capitalize font-medium py-2 transition-all duration-300 ${
                    activeSection === section
                      ? hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                      : hackerMode ? 'text-green-600' : darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ============= FLOATING CONTACT BUTTON ============= */}
      <button
        onClick={() => setShowContact(!showContact)}
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'
        } text-white`}
      >
        {showContact ? <X size={20} /> : <Mail size={20} />}
      </button>

      {/* ============= CONTACT SIDEBAR ============= */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        showContact ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className={`p-4 sm:p-6 rounded-l-2xl backdrop-blur-md space-y-3 sm:space-y-4 ${
          darkMode ? 'bg-gray-800/90 border-l-4 border-purple-500' : 'bg-white/90 border-l-4 border-purple-600'
        }`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Contact</h3>
          <a href="mailto:nishank.nn.1212@gmail.com" 
             className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Mail size={18} />
            <span className="text-sm sm:text-base">Email</span>
          </a>
          <a href="https://github.com/nishankuprety" target="_blank" rel="noopener noreferrer"
             className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Github size={18} />
            <span className="text-sm sm:text-base">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/nishank-uprety" target="_blank" rel="noopener noreferrer"
             className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Linkedin size={18} />
            <span className="text-sm sm:text-base">LinkedIn</span>
          </a>
          <a href="tel:+9779804933328"
             className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Phone size={18} />
            <span className="text-sm sm:text-base">+977-9804933328</span>
          </a>
        </div>
      </div>

      {/* ============= MAIN CONTENT ============= */}
      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-12 relative z-10">
        
        {/* ============= HOME SECTION ============= */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Profile Photo */}
              <div className="relative inline-block mb-8">
                <div className={`absolute inset-0 blur-2xl opacity-50 ${
                  hackerMode ? 'bg-green-500' : darkMode ? 'bg-purple-500' : 'bg-purple-400'
                } rounded-full animate-pulse`} />
                <img 
                  src="/photo.jpg" 
                  alt="Nishank Uprety"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-purple-500 shadow-2xl mx-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200/6366f1/ffffff?text=NU';
                  }}
                />
              </div>

              <h2 className={`text-4xl sm:text-6xl md:text-8xl font-bold ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {nerdMode ? 'HeLLo, I\'m' : 'Hi, I\'m'} <span className={`${
                  hackerMode ? 'text-green-400 animate-pulse' : darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>{nerdMode ? 'NiShAnK' : 'Nishank'}</span>
              </h2>
              
              <div className="h-16">
                <p className={`text-lg sm:text-xl md:text-3xl ${
                  hackerMode ? 'text-green-300' : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {typedText}<span className="animate-pulse">|</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <button 
                  onClick={() => setActiveSection('projects')}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
                    hackerMode
                      ? 'bg-green-500 text-black hover:bg-green-400'
                      : darkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  }`}
                >
                  {nerdMode ? '>> vIeW_mY_wOrK()' : 'View My Work'}
                </button>
              </div>

              <div className="flex justify-center space-x-4 sm:space-x-6 pt-12">
                <a href="https://github.com/nishankuprety" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/nishank-uprety" target="_blank" rel="noopener noreferrer"
                   className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Linkedin size={20} />
                </a>
                <a href="mailto:nishank.nn.1212@gmail.com"
                   className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ============= ABOUT SECTION ============= */}
        {activeSection === 'about' && (
          <section className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto space-y-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {nerdMode ? 'aBouT_Me()' : 'About'} <span className={
                  hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                }>{nerdMode ? ';' : 'Me'}</span>
              </h2>

              <div className={`p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${
                hackerMode ? 'bg-black/50 border border-green-500' : darkMode ? 'bg-gray-800/50 border border-purple-500/20' : 'bg-white/80 border border-purple-200'
              }`}>
                <p className={`text-lg leading-relaxed ${
                  hackerMode ? 'text-green-300' : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I finished my bachelor's degree in Computer Applications with a specialization in Data Science and AI/ML from Manipal University. 
                  I love creating websites and applications, and I'm always eager to learn new technologies. In my free time, I enjoy playing table tennis, 
                  hitting the gym, and exploring new coding challenges!
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ============= PROJECTS SECTION ============= */}
        {activeSection === 'projects' && (
          <section className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto space-y-12">
              <h2 className={`text-5xl font-bold text-center ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {nerdMode ? 'pRoJeCtS[]' : 'My'} <span className={
                  hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                }>{nerdMode ? ' = {}' : 'Projects'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <div 
                    key={idx} 
                    className={`group p-6 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer ${
                      hackerMode 
                        ? 'bg-black/50 border border-green-500 hover:border-green-400' 
                        : darkMode 
                        ? 'bg-gray-800/50 border border-purple-500/20 hover:border-purple-400' 
                        : 'bg-white/80 border border-purple-200 hover:border-purple-400'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="text-4xl sm:text-5xl mb-4">{project.icon}</div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${
                      hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`mb-4 text-sm sm:text-base ${
                      hackerMode ? 'text-green-300' : darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs ${
                          hackerMode ? 'bg-green-500/30 text-green-300' : darkMode ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          hackerMode 
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                            : darkMode 
                            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' 
                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                        }`}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          hackerMode 
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                            : darkMode 
                            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' 
                            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                        }`}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============= GALLERY SECTION ============= */}
        {activeSection === 'gallery' && (
          <section className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto space-y-12">
              <h2 className={`text-5xl font-bold text-center ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Camera className="inline mb-2" /> Gallery
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                      darkMode ? 'border-2 border-purple-500/20' : 'border-2 border-purple-200'
                    }`}
                  >
                    <img 
                      src={img.src} 
                      alt={img.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/6366f1/ffffff?text=' + img.title;
                      }}
                    />
                    <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t ${
                      darkMode ? 'from-gray-900' : 'from-white'
                    } to-transparent`}>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============= RESUME SECTION ============= */}
        {activeSection === 'resume' && (
          <section className="min-h-screen py-20">
            <div className="max-w-4xl mx-auto space-y-12">
              <h2 className={`text-5xl font-bold text-center ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {nerdMode ? 'rEsUmE.pdf' : 'My Resume'}
              </h2>

              <div className="text-center">
                <a 
                  href="resume.pdf" 
                  download="Nishank_Uprety_Resume.pdf"
                  className={`inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-110 text-sm sm:text-base ${
                    hackerMode
                      ? 'bg-green-500 text-black hover:bg-green-400'
                      : darkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  }`}
                >
                  <Download size={20} />
                  <span>{nerdMode ? 'dOwNlOaD()' : 'Download Resume'}</span>
                </a>
              </div>

              <div className={`p-8 rounded-2xl backdrop-blur-md ${
                hackerMode ? 'bg-black/50 border border-green-500' : darkMode ? 'bg-gray-800/50 border border-purple-500/20' : 'bg-white/80 border border-purple-200'
              }`}>
                <div className="space-y-8">
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center ${
                      hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      <GraduationCap className="mr-2" /> Education
                    </h3>
                    <div className={`p-4 rounded-lg ${
                      hackerMode ? 'bg-green-500/10' : darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <h4 className={`text-lg font-bold ${
                        hackerMode ? 'text-green-300' : darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Bachelor of Computer Applications (BCA)
                      </h4>
                      <p className={`${
                        hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        Data Science and AI/ML Specialization
                      </p>
                      <p className={`${
                        hackerMode ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Manipal University | 2022 – 2025
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center ${
                      hackerMode ? 'text-green-400' : darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      <Award className="mr-2" /> Publications
                    </h3>
                    <div className={`p-4 rounded-lg ${
                      hackerMode ? 'bg-green-500/10' : darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <h4 className={`text-lg font-bold ${
                        hackerMode ? 'text-green-300' : darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Integration of UNET and GAN for Specular Reflection Detection
                      </h4>
                      <p className={`${
                        hackerMode ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        IEEE CONECCT 2025 | Paper ID: 2025IEEECONECCT-1881
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ============= FOOTER ============= */}
      <footer className={`relative z-10 py-8 backdrop-blur-md ${
        hackerMode ? 'bg-black/80 border-t border-green-500' : darkMode ? 'bg-gray-900/50 border-t border-purple-500/20' : 'bg-white/50 border-t border-purple-200'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className={`${
            hackerMode ? 'text-green-400 font-mono' : darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {nerdMode 
              ? '© 2024 NiShAnK_UpReTy | bUiLt_WiTh: [ReAcT, TaiLwInD]' 
              : '© 2024 Nishank Uprety. Built with React & Tailwind CSS'}
          </p>
        </div>
      </footer>

      {/* ============= AUDIO ELEMENTS ============= */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={hackerAudioRef} loop>
        <source src="/exclusive.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={lofiAudioRef} loop>
        <source src="/lofi.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={magicAudioRef}>
        <source src="/magicmode.mp3" type="audio/mpeg" />
      </audio>

      {/* ============= CUSTOM CSS ANIMATIONS ============= */}
      <style jsx>{`
        @keyframes sparkle {
          0% { opacity: 1; transform: scale(1) rotate(0deg); }
          100% { opacity: 0; transform: scale(2) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}