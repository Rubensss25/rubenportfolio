import { useEffect, useState, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  User, 
  Facebook, 
  Instagram, 
  Twitter,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


// Typing Animation Hook
function useTypingEffect(texts: string[], speed: number = 100, pause: number = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, pause]);

  return displayText;
}

// Intersection Observer Hook for animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a1628]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-semibold text-lg">RUBEN</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-gray-300 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a href="#contact">
              <Button className="bg-white text-[#0a1628] hover:bg-gray-200 rounded-full px-4 sm:px-6 text-sm sm:text-base">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Contact Me</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628]/95 backdrop-blur-md rounded-lg mt-2 p-4 absolute left-4 right-4 top-16 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-700">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-white text-[#0a1628] hover:bg-gray-200 rounded-full">
                    <User className="w-4 h-4 mr-2" />
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const jobTitle = useTypingEffect(['Virtual Assistant', 'Web Developer', 'Technical Support'], 100, 2000);
  const { ref, isInView } = useInView();

  return (
    <section id="home" className="min-h-screen geometric-bg flex items-center pt-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl text-white font-light ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>Hi!</h2>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl text-white ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              I'm <span className="gradient-text font-semibold">Ruben Albao</span>
            </h1>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-white font-bold ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              A <span className="typing-cursor">{jobTitle}</span>
            </h2>
            <p className={`text-gray-400 text-base lg:text-lg max-w-full lg:max-w-md ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              "I'm motivated by a profound passion for technology and a strong willingness to learn."
            </p>

            {/* Contact Info */}
            <div className={`space-y-2 lg:space-y-3 pt-3 lg:pt-4 ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 lg:gap-3 text-gray-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" />
                </div>
                <span className="text-xs lg:text-sm">Looc, Nasugbu, Batangas (Philippines)</span>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 text-gray-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" />
                </div>
                <span className="text-xs lg:text-sm">(+63) 992 4929 390</span>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 text-gray-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-blue-500" />
                </div>
                <span className="text-xs lg:text-sm">albaobhong@gmail.com</span>
              </div>
            </div>

            <p className={`text-gray-500 text-xs lg:text-sm pt-1 lg:pt-2 ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              I created this web portfolio using <span className="text-blue-400">ReactJS</span> .
            </p>

            <Button className={`bg-white text-[#0a1628] hover:bg-gray-200 rounded-full px-4 lg:px-6 py-2 text-sm lg:text-base mt-3 lg:mt-4 ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
              <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              <span className="hidden lg:inline">Download Resume</span>
              <span className="lg:hidden">Resume</span>
            </Button>
          </div>

          {/* Right Content - Profile Image */}
          <div className={`flex justify-center lg:justify-end order-1 lg:order-2 ${isInView ? 'slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Hexagon Border */}
              <div className="hexagon-border w-56 h-64 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]">
                <div className="hexagon-inner flex items-center justify-center overflow-hidden">
                  {/* Profile Image */}
                  <img 
                    src="/assets/images/Ruben Profile.jpg" 
                    alt="Ruben Albao Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  const { ref, isInView } = useInView();

  const educationData = [
    {
      school: 'Batangas State University-Arasof Nasugbu',
      degree: 'Bachelor of Science in Information Technology, Major in Business Analytics',
      year: 'Since 2022',
      location: 'Tertiary',
      side: 'left'
    },
    {
      school: 'Pantalan Senior High School',
      degree: 'Senior High School',
      year: '2017-2018',
      location: 'Senior High School',
      side: 'right'
    },
    {
      school: 'Looc National High School',
      degree: 'High School',
      year: '2013-2016',
      location: 'High School',
      side: 'left'
    },
    {
      school: 'Looc Elementary School',
      degree: 'Elementary',
      year: '2005-2012',
      location: 'Elementary',
      side: 'right'
    }
  ];

  return (
    <section id="education" className="py-20 bg-[#0a1628]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isInView ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Educational Background</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My educational background shows my unwavering commitment to lifelong learning and personal development. 
            It attests to my unwavering pursuit of information and skill development in order to achieve in my chosen field.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block timeline-line" />

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative ${
                  isInView ? (edu.side === 'left' ? 'fade-in-left' : 'fade-in-right') : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center">
                  {/* Left Card */}
                  <div className="w-5/12">
                    {edu.side === 'left' && (
                      <div className="skill-card bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <span></span>
                        <div className="w-full h-1 bg-blue-500 mb-4 rounded-full" />
                        <h3 className="text-white font-semibold text-lg">{edu.school}</h3>
                        <p className="text-blue-400 font-medium">{edu.degree}</p>
                        <p className="text-gray-400 text-sm mt-2">{edu.year}</p>
                        <p className="text-gray-500 text-sm">{edu.location}</p>
                        <div className="w-full h-1 bg-blue-500 mt-4 rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Center Timeline Logo */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-800 flex items-center justify-center">
                      <img 
                        src={`/assets/images/logo/${
                          edu.side === 'left' 
                            ? (index === 0 ? 'bsu logo.jpg' : 'Looc NHS logo.jpg')
                            : (index === 1 ? 'Pantalan logo.jpg' : 'Looc ES logo.jpg')
                        }`} 
                        alt={`${edu.school} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Right Card */}
                  <div className="w-5/12">
                    {edu.side === 'right' && (
                      <div className="skill-card bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <span></span>
                        <div className="w-full h-1 bg-blue-500 mb-4 rounded-full" />
                        <h3 className="text-white font-semibold text-lg">{edu.school}</h3>
                        <p className="text-blue-400 font-medium">{edu.degree}</p>
                        <p className="text-gray-400 text-sm mt-2">{edu.year}</p>
                        <p className="text-gray-500 text-sm">{edu.location}</p>
                        <div className="w-full h-1 bg-blue-500 mt-4 rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Layout - Show logo on left, card on right */}
                <div className="md:hidden">
                  <div className="flex items-center gap-4">
                    {/* School Logo - Left */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-800 flex items-center justify-center">
                        <img 
                          src={`/assets/images/logo/${
                            edu.side === 'left' 
                              ? (index === 0 ? 'bsu logo.jpg' : 'Looc NHS logo.jpg')
                              : (index === 1 ? 'Pantalan logo.jpg' : 'Looc ES logo.jpg')
                          }`} 
                          alt={`${edu.school} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Education Card - Right */}
                    <div className="flex-1">
                      <div className="skill-card bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
                        <span></span>
                        <div className="w-full h-1 bg-blue-500 mb-2 sm:mb-3 rounded-full" />
                        <h3 className="text-white font-semibold text-sm sm:text-base">{edu.school}</h3>
                        <p className="text-blue-400 font-medium text-xs sm:text-sm">{edu.degree}</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">{edu.year}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{edu.location}</p>
                        <div className="w-full h-1 bg-blue-500 mt-2 sm:mt-3 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const { ref, isInView } = useInView();

  const programmingSkills = [
    { name: 'ReactJS', level: 43, icon: '⚛️' },
    { name: 'HTML5', level: 68, icon: '🌐' },
    { name: 'CSS3', level: 62, icon: '🎨' },
    { name: 'Javascript', level: 38, icon: '📜' },
    { name: 'Java', level: 32, icon: '☕' },
    { name: 'VB.net', level: 58, icon: '🔷' },
    { name: 'Mysql', level: 63, icon: '🐬' },
  ];

  const otherSkills = [
    {
      title: 'Software Applications',
      description: 'My skills include Microsoft 365 competency as well as good understanding of Adobe Photoshop and Adobe Illustrator, allowing me to efficiently use and navigate these software products for a variety of jobs and projects.',
      icon: '💻'
    },
    {
      title: 'Software Troubleshoot',
      description: 'I possess strong troubleshooting skills, specializing in diagnosing and resolving software-related difficulties, particularly on Windows operating systems.',
      icon: '🔧'
    },
    {
      title: 'Hardware Troubleshoot',
      description: 'I possess expertise in computer hardware troubleshooting, allowing me to effectively detect and address hardware-related issues, assuring optimal system performance.',
      icon: '🖥️'
    },
    {
      title: 'Networking',
      description: 'In terms of networking, I have a basic understanding of network components, IP addressing, subnetting, and basic network configuration, which enables me to perform simple networking tasks and troubleshoot basic network issues.',
      icon: '🌐'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-[#0a1628]" ref={ref}>
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isInView ? 'fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I do</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              I'm a recent graduate and aspiring web developer with a strong desire to broaden my technological knowledge 
              and a keen interest in crafting both visually appealing designs and seamless website functionality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Programming/Library Skills - Left */}
            <div className={`${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6 text-center">Programming/Library Skills</h3>
              <div className="space-y-3 lg:space-y-4">
                {programmingSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 lg:gap-4">
                    <span className="text-xl lg:text-2xl">{skill.icon}</span>
                    <span className="text-white w-20 lg:w-24 text-xs lg:text-sm">{skill.name}</span>
                    <div className="flex-1">
                      <div className="h-5 lg:h-6 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-end pr-1 lg:pr-2 progress-fill text-xs lg:text-xs"
                          style={{ 
                            '--progress': `${skill.level}%`,
                            width: isInView ? `${skill.level}%` : '0%',
                            transition: `width 1s ease-out ${index * 0.1}s`
                          } as React.CSSProperties}
                        >
                          <span className="text-white font-medium">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Skills - Right */}
            <div className={`${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6 text-center">Other Skills</h3>
              <div className="space-y-3 lg:space-y-4">
                {otherSkills.map((skill, index) => (
                  <div key={index} className="flex gap-3 lg:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
                        {skill.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm lg:text-base">{skill.title}</h4>
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const { ref, isInView } = useInView();
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: 'Login Page',
      description: 'In this part, the user will login with their username and password. The default login credentials are admin in both username and password.',
      image: 'login'
    },
    {
      title: 'Home Panel',
      description: 'In this panel, the user will see a list of all NAPs based on the barangay selected, and will be able to add, change, remove, and see a list of clients who had connections with a certain NAP.',
      image: 'home'
    },
    {
      title: 'NAP Location Tracker',
      description: 'In this part, the user can click the View Map button (see previews card) and view the location of the NAP using Google Maps in the default browser and receive directions from the NAP to the client.',
      image: 'tracker'
    },
    {
      title: 'NAP and Client Locator',
      description: 'The user will input the map coordinates of the client to see the distance and direction between the NAP and client.',
      image: 'locator'
    },
    {
      title: 'Direction in Google Map',
      description: 'This is the result after the input of client map coordinates, which displays the direction and distance between the client and NAP.',
      image: 'direction'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-20 bg-[#0a1628]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isInView ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Project</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            NAPs Management System, a system developed by myself during my OJT in DCTECH Microservice Incorporated 
            using VB.net and MySQL to manage data connected to Network Access Points (NAPs) mounted on electrical poles.
          </p>
        </div>

        {/* Project Carousel */}
        <div className={`relative ${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className={`relative h-48 sm:h-64 md:h-80 lg:h-[400px] flex items-center justify-center perspective-1000`}>
            {projects.map((project, index) => {
              const offset = index - currentSlide;
              const isActive = offset === 0;
              const isPrev = offset === -1 || (currentSlide === 0 && index === projects.length - 1);
              const isNext = offset === 1 || (currentSlide === projects.length - 1 && index === 0);

              return (
                <div
                  key={index}
                  className={`absolute w-full max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-xl transition-all duration-500 ${
                    isActive ? 'z-20 scale-100 opacity-100' : 
                    isPrev ? 'z-10 -translate-x-1/8 sm:-translate-x-1/6 md:-translate-x-1/4 scale-85 opacity-50' :
                    isNext ? 'z-10 translate-x-1/8 sm:translate-x-1/6 md:translate-x-1/4 scale-85 opacity-50' :
                    'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: isActive ? 'translateX(0) scale(1)' :
                              isPrev ? 'translateX(-15%) translateX(-20%) scale(0.85) rotateY(15deg)' :
                              isNext ? 'translateX(15%) translateX(20%) scale(0.85) rotateY(-15deg)' : 'scale(0.75)'
                  }}
                >
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                    {/* Project Image Placeholder */}
                    <div className="h-20 sm:h-28 md:h-32 lg:h-40 bg-gradient-to-br from-green-900/50 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">DC</span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">DCTECH</p>
                        <p className="text-gray-500 text-xs">{project.title}</p>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                      <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-1 sm:gap-1.5 lg:gap-2 mt-4 sm:mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-500 w-3 sm:w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1.5 sm:left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-10 lg:w-10 lg:h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors text-xs sm:text-sm lg:text-base"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-1.5 sm:right-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-10 lg:w-10 lg:h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors text-xs sm:text-sm lg:text-base"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isInView } = useInView();

  // Generate random network nodes
  const nodes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2
  }));

  return (
    <section id="contact" className="py-20 bg-[#0a1628] relative overflow-hidden" ref={ref}>
      {/* Network Background */}
      <div className="network-bg">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="network-node"
            style={{
              left: node.left,
              top: node.top,
              animationDelay: `${node.delay}s`
            }}
          />
        ))}
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {nodes.slice(0, 15).map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <line
                key={i}
                x1={`${parseFloat(node.left)}%`}
                y1={`${parseFloat(node.top)}%`}
                x2={`${parseFloat(nextNode.left)}%`}
                y2={`${parseFloat(nextNode.top)}%`}
                stroke="#3b82f6"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${isInView ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Me</h2>
          <p className="text-gray-400">
            Please fill out the form below to initiate discussing about potential job opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Illustration */}
          <div className={`hidden lg:flex justify-center ${isInView ? 'slide-in' : 'opacity-0'}`}>
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {/* Contact Illustration */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Phone Base */}
                <ellipse cx="200" cy="320" rx="120" ry="30" fill="#1e3a5f" />
                <rect x="120" y="200" width="160" height="120" rx="20" fill="#2d4a6f" />
                <rect x="130" y="210" width="140" height="100" rx="15" fill="#1e3a5f" />
                
                {/* Person */}
                <circle cx="200" cy="140" r="35" fill="#f4a261" />
                <path d="M165 180 Q200 160 235 180 L235 220 L165 220 Z" fill="#2a9d8f" />
                <rect x="175" y="180" width="15" height="40" fill="#f4a261" />
                <rect x="210" y="180" width="15" height="40" fill="#f4a261" />
                
                {/* Megaphone */}
                <path d="M240 150 L280 130 L280 170 Z" fill="#e76f51" />
                <rect x="230" y="145" width="15" height="20" fill="#264653" />
                
                {/* Sound Waves */}
                <path d="M290 140 Q310 150 290 160" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
                </path>
                
                {/* Envelope */}
                <rect x="150" y="250" width="40" height="30" rx="5" fill="#e9c46a" />
                <path d="M150 255 L170 270 L190 255" stroke="#bfa030" strokeWidth="2" fill="none" />
                
                {/* Paper Plane */}
                <path d="M280 250 L320 270 L280 290 L290 270 Z" fill="#3b82f6" opacity="0.8">
                  <animateTransform attributeName="transform" type="translate" values="0,0; 10,-10; 0,0" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Clouds */}
                <ellipse cx="100" cy="100" rx="25" ry="15" fill="#fff" opacity="0.3" />
                <ellipse cx="320" cy="80" rx="30" ry="18" fill="#fff" opacity="0.2" />
              </svg>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isInView ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <form className="space-y-3 lg:space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-10 lg:h-12 text-sm lg:text-base"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-10 lg:h-12 text-sm lg:text-base"
              />
              <Textarea
                placeholder="Your Message"
                rows={5}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 resize-none text-sm lg:text-base"
              />
              <Button className="w-full bg-white text-[#0a1628] hover:bg-gray-200 h-10 lg:h-12 font-semibold text-sm lg:text-base">
                Submit
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-6 lg:mt-8 text-center">
              <p className="text-gray-400 text-xs lg:text-sm mb-3 lg:mb-4">Or message me through social media accounts</p>
              <div className="flex justify-center gap-3 lg:gap-4">
                <a href="#" className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </a>
                <a href="#" className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Instagram className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </a>
                <a href="#" className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#0a1628] border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 text-sm">
          Copyright © 2023 Ruben Albao. All right received.
        </p>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navigation />
      <HeroSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
