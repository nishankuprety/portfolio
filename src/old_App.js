import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Volume2, VolumeX, Github, Linkedin, Mail, Download, ExternalLink, Briefcase, GraduationCap, Award, Terminal, Phone, Zap, Sparkles, Camera, Menu, X } from 'lucide-react';

/* 
==============================================
FILE PLACEMENT GUIDE:
==============================================
Create a "public" folder in your project root and place these files:

public/
├── photo.jpg           (Your profile picture - 500x500px recommended)
├── music.mp3           (Main background music)
├── exclusive.mp3       (Hacker mode secret song)
├── lofi.mp3           (Ambient/lofi mode music)
├── magicmode.mp3      (Magic mode sound effects)
├── gallery/
│   ├── photo1.jpg     (Gallery images)
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg

Then access them in code as: "/photo.jpg", "/music.mp3", etc.
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
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [fallingIcons, setFallingIcons] = useState([]);
  
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

  // ============= MINI GAME =============
  useEffect(() => {
    if (gameActive) {
      const gameInterval = setInterval(() => {
        const icons = ['💻', '🚀', '⚡', '🎮', '🔥', '⭐', '💎', '🎯'];
        const newIcon = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 50),
          y: -50,
          icon: icons[Math.floor(Math.random() * icons.length)],
          speed: Math.random() * 3 + 10
        };
        setFallingIcons(prev => [...prev, newIcon]);
      }, 1000);
      return () => clearInterval(gameInterval);
    }
  }, [gameActive]);

  useEffect(() => {
    if (gameActive) {
      const moveInterval = setInterval(() => {
        setFallingIcons(prev => 
          prev.map(icon => ({ ...icon, y: icon.y + icon.speed }))
            .filter(icon => icon.y < window.innerHeight)
        );
      }, 50);
      return () => clearInterval(moveInterval);
    }
  }, [gameActive]);

  const catchIcon = (iconId) => {
    setFallingIcons(prev => prev.filter(icon => icon.id !== iconId));
    setGameScore(prev => prev + 10);
  };

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
    {
      title: "Fischl - Discord Bot",
      description: "A feature-rich Discord bot serving 200,000+ users with 99.9% uptime. Includes ticket management, event coordination, and real-time analytics dashboard.",
      tech: ["Python", "Discord.py", "Flask", "Firebase", "Prometheus", "Grafana"],
      icon: "🤖",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Medical Image Inpainting",
      description: "IEEE published research combining UNET and GAN for specular reflection detection in colposcopy images.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "GANs"],
      icon: "🔬",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Downtown Restro Website",
      description: "Full-stack restaurant website with QR-based digital menu system. Self-hosted on local server.",
      tech: ["React", "Node.js", "PHP", "MySQL"],
      icon: "🍽️",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Snake Game",
      description: "Classic snake game built with vanilla JavaScript. Features smooth controls and progressive difficulty.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      icon: "🐍",
      color: "from-pink-500 to-purple-500"
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

      {/* ============= GAME ICONS ============= */}
      {gameActive && fallingIcons.map(icon => (
        <div
          key={icon.id}
          className="fixed text-4xl cursor-pointer z-40 animate-bounce"
          style={{ left: icon.x, top: icon.y }}
          onClick={() => catchIcon(icon.id)}
        >
          {icon.icon}
        </div>
      ))}

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
        <nav className="container mx-auto px-6 py-4">
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

            <div className="flex items-center space-x-2">
              {/* Game Toggle */}
              {gameActive && (
                <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  Score: {gameScore}
                </span>
              )}
              <button
                onClick={() => { setGameActive(!gameActive); setGameScore(0); }}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  gameActive 
                    ? 'bg-red-500 text-white' 
                    : darkMode ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : 'bg-purple-100 text-purple-600'
                }`}
                title="Catch the Icons Game"
              >
                🎮
              </button>

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
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
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
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
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
      </header>

      {/* ============= FLOATING CONTACT BUTTON ============= */}
      <button
        onClick={() => setShowContact(!showContact)}
        className={`fixed right-6 bottom-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'
        } text-white`}
      >
        {showContact ? <X size={24} /> : <Mail size={24} />}
      </button>

      {/* ============= CONTACT SIDEBAR ============= */}
      <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        showContact ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className={`p-6 rounded-l-2xl backdrop-blur-md space-y-4 ${
          darkMode ? 'bg-gray-800/90 border-l-4 border-purple-500' : 'bg-white/90 border-l-4 border-purple-600'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Contact</h3>
          <a href="mailto:nishank.nn.1212@gmail.com" 
             className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Mail size={20} />
            <span>Email</span>
          </a>
          <a href="https://github.com/nishankuprety" target="_blank" rel="noopener noreferrer"
             className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/nishank-uprety" target="_blank" rel="noopener noreferrer"
             className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a href="tel:+9779804933328"
             className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:scale-105 ${
               darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
             }`}>
            <Phone size={20} />
            <span>+977-9804933328</span>
          </a>
        </div>
      </div>

      {/* ============= MAIN CONTENT ============= */}
      <main className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        
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
                  className="relative w-48 h-48 rounded-full object-cover border-4 border-purple-500 shadow-2xl mx-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200/6366f1/ffffff?text=NU';
                  }}
                />
              </div>

              <h2 className={`text-6xl md:text-8xl font-bold ${
                hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {nerdMode ? 'HeLLo, I\'m' : 'Hi, I\'m'} <span className={`${
                  hackerMode ? 'text-green-400 animate-pulse' : darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>{nerdMode ? 'NiShAnK' : 'Nishank'}</span>
              </h2>
              
              <div className="h-16">
                <p className={`text-xl md:text-3xl ${
                  hackerMode ? 'text-green-300' : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {typedText}<span className="animate-pulse">|</span>
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 pt-8">
                <button 
                  onClick={() => setActiveSection('projects')}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
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

              <div className="flex justify-center space-x-6 pt-12">
                <a href="https://github.com/nishankuprety" target="_blank" rel="noopener noreferrer" 
                   className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/nishank-uprety" target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Linkedin size={24} />
                </a>
                <a href="mailto:nishank.nn.1212@gmail.com"
                   className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                     hackerMode ? 'bg-green-500/20 text-green-400' : darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                   }`}>
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ============= ABOUT SECTION ============= */}
        {activeSection === 'about' && (
          <section className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto space-y-16">
              <h2 className={`text-5xl font-bold text-center ${
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

              <div className="grid md:grid-cols-2 gap-8">
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
                    <div className="text-5xl mb-4">{project.icon}</div>
                    <h3 className={`text-2xl font-bold mb-3 ${
                      hackerMode ? 'text-green-400' : darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`mb-4 ${
                      hackerMode ? 'text-green-300' : darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs ${
                          hackerMode ? 'bg-green-500/30 text-green-300' : darkMode ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {tech}
                        </span>
                      ))}
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <button className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-110 ${
                  hackerMode
                    ? 'bg-green-500 text-black hover:bg-green-400'
                    : darkMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                  <Download size={20} />
                  <span>{nerdMode ? 'dOwNlOaD()' : 'Download Resume'}</span>
                </button>
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
        <div className="container mx-auto px-6 text-center">
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