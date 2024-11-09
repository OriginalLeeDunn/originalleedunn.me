import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Mic, MicOff, Home, User, Code, Briefcase, GraduationCap, Award, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import avatarImage from '../images/avatar.gif'

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    readonly isTrusted: boolean;
  }
}


const sections = [
  { name: 'Home', icon: Home },
  { name: 'Profile', icon: User },
  { name: 'Skills', icon: Code },
  { name: 'Projects', icon: Briefcase },
  { name: 'Experience', icon: Award },
  { name: 'Education', icon: GraduationCap }
]

const skills = [
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 80 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 75 },
  { name: "AI Tools", level: 90 },
]

const projects = [
  { name: "Personal Website", description: "Developed my personal website to showcase my portfolio and blog.", techs: ["Next.js", "Vercel"], stars: 150 },
  { name: "AI Voice Assistant 'Neptune'", description: "Created an AI voice assistant capable of performing various tasks through voice commands.", techs: ["Python", "TensorFlow", "SpeechRecognition"], stars: 200 },
  { name: "AI Integrated Web Scraper", description: "Built a web scraper integrated with AI to extract and analyze data from websites.", techs: ["Python", "BeautifulSoup", "TensorFlow"], stars: 175 },
  { name: "Personal AGI", description: "Developed a personal AGI using local models to create agents for handling tasks.", techs: ["Python", "TensorFlow", "PyTorch"], stars: 220 },
  { name: "Cinnamon Roll E-commerce Website", description: "Created a website for my wife to sell cinnamon rolls online.", techs: ["Shopify", "JavaScript"], stars: 130 },
  { name: "Tech Startup", description: "Working on a tech startup with a cohort of best friends/partners.", techs: ["Various"], stars: 100 }
]

const experiences = [
  { 
    role: "Tech 1 - Application Services", 
    company: "Nordstrom", 
    duration: "Oct 2021 - Present", 
    description: "Supporting End User Support and Application Services, focusing on DevOps oriented work. Transitioned from direct support to kanban-based development tasks, building and maintaining internal applications." 
  },
  { 
    role: "Tech 1 Contractor", 
    company: "Nordstrom", 
    duration: "Feb 2020 - Oct 2021", 
    description: "Provided End User Support as a contractor, handling technical support while building foundation for future development work." 
  }
]

const education = [
  { 
    degree: "Self-Taught Development", 
    school: "Continuous Learning", 
    year: "2023 - Present", 
    focus: "Full Stack Development, AI Integration, and Modern Web Technologies",
    skills: ["TypeScript", "React", "Python", "Node.js"]
  },
  { 
    degree: "Technical Foundation", 
    school: "Hands-on Experience", 
    year: "2001 - Present", 
    focus: "Started with PC building at age 9, evolved into software development",
    skills: ["Hardware", "Troubleshooting", "System Administration"]
  }
]

const chartdata = [
  { name: "React", hours: 450 },
  { name: "TypeScript", hours: 390 },
  { name: "Node.js", hours: 370 },
  { name: "GraphQL", hours: 280 },
  { name: "Python", hours: 220 },
]

// Add these type declarations at the top of your file
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Add the error event interface
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    readonly isTrusted: boolean;
  }
}

export function BlockPage() {
  // Move all state and ref declarations inside the component
  const [activeSection, setActiveSection] = useState('Home')
  const [isListening, setIsListening] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const controls = useAnimation()
  
  // Update the ref type to avoid window namespace issues
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // Use type assertion to handle the window object
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const command = event.results[i][0].transcript.toLowerCase().trim()
              handleVoiceCommand(command)
            }
          }
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  }, [])

  const handleVoiceCommand = (command: string) => {
    const sectionMatch = sections.find(section => command.includes(section.name.toLowerCase()))
    if (sectionMatch) {
      setActiveSection(sectionMatch.name)
      rotateToSection(sectionMatch.name)
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
    setIsListening(!isListening)
  }

  const rotateToSection = (sectionName: string) => {
    const index = sections.findIndex(section => section.name === sectionName)
    const newAngle = -(index * (360 / sections.length))
    setRotationAngle(newAngle)
    controls.start({ 
      rotate: newAngle,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30
      }
    })
  }

  const sectionComponents = {
    Home: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Welcome to My Immersive Portfolio</h1>
        <p className="text-lg md:text-xl mb-8">Explore my professional journey through an interactive experience.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.slice(1).map((section) => (
            <motion.button
              key={section.name}
              className="p-4 bg-purple-600 rounded-lg text-white text-sm md:text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(section.name)
                rotateToSection(section.name)
              }}
            >
              {section.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
    ),
    Profile: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <motion.img
              src={avatarImage}
              alt="Lee Dunn Avatar"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover bg-background shadow-lg"
              whileHover={{ 
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.8 }
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">Lee Dunn</h2>
              <p className="text-gray-400">Developer & Designer | AI Enthusiast</p>
              <div className="mt-2 space-y-1 md:space-y-0 md:space-x-2">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  OriginalLeeDunn@proton.me
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4" />
                  Tacoma, WA
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="text-gray-300">
            My journey in technology began at age 9, building PCs and developing a deep fascination with computing. 
            Now at 31, I've evolved into a Developer and Designer with a passion for emerging technologies and AI. 
            While I'm self-taught without formal education, my practical experience and dedication to continuous learning 
            have equipped me with strong skills in TypeScript, Python, React, and Node.js. Currently seeking to transition 
            into a Junior Engineering role while pursuing entrepreneurial ambitions in the startup space.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <motion.a 
            href="https://github.com/originalLeedunn" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-purple-400 hover:text-purple-300"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/originalLeedunn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-purple-400 hover:text-purple-300"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a 
            href="https://twitter.com/originalLeedunn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-purple-400 hover:text-purple-300"
          >
            <Twitter className="w-6 h-6" />
          </motion.a>
        </div>
      </motion.div>
    ),
    Skills: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Skills Overview</h3>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative h-64 md:h-80">
                {chartdata.map((item, index) => {
                  const angle = (index / chartdata.length) * Math.PI * 2 - Math.PI / 2
                  const radius = 100
                  const x = Math.cos(angle) * radius + 120
                  const y = Math.sin(angle) * radius + 120
                  return (
                    <div key={item.name} className="absolute" style={{ left: x, top: y }}>
                      <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                      <p className="text-xs mt-1">{item.name}</p>
                      <p className="text-xs">{item.hours} hrs</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ),
    Projects: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">Notable Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techs.map((tech, i) => (
                  <span key={i} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{project.stars}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    Experience: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                  <h4 className="text-lg font-semibold">{exp.role}</h4>
                  <p className="text-purple-400">{exp.company}</p>
                </div>
                <p className="text-gray-400 mt-1 md:mt-0">{exp.duration}</p>
              </div>
              <p className="text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    Education: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">Learning Journey</h3>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400">{edu.degree}</h4>
                  <p className="text-gray-300">{edu.school}</p>
                </div>
                <p className="text-gray-400 mt-1 md:mt-0">{edu.year}</p>
              </div>
              <p className="text-gray-300 mb-3">{edu.focus}</p>
              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-lg p-6 border border-purple-500/20"
          >
            <h4 className="text-lg font-semibold mb-2">Continuous Learning Approach</h4>
            <p className="text-gray-300">
              While I don't have traditional education credentials, my learning journey is driven by hands-on experience, 
              practical application, and staying current with emerging technologies. I believe in learning by doing and 
              constantly challenging myself with new projects and technologies.
            </p>
          </motion.div>
        </div>
      </motion.div>
    ),
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {sectionComponents[activeSection as keyof typeof sectionComponents]()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Smooth Rotating Navigation */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-80 h-80">
          <motion.div
            className="absolute inset-0"
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: 'center center' }}
          >
            {sections.map((section, index) => {
              const angle = (index / sections.length) * 360
              const radius = 150
              const x = Math.sin((angle * Math.PI) / 180) * radius
              const y = -Math.cos((angle * Math.PI) / 180) * radius

              return (
                <motion.button
                  key={section.name}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center ${
                    activeSection === section.name ? 'bg-purple-600' : 'bg-gray-800'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px - 32px)`,
                    top: `calc(50% + ${y}px - 32px)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setActiveSection(section.name)
                    rotateToSection(section.name)
                  }}
                >
                  <motion.div
                    style={{
                      rotate: `${-rotationAngle}deg`,
                    }}
                  >
                    <section.icon className="w-8 h-8" />
                  </motion.div>
                </motion.button>
              )
            })}
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              className="p-6 rounded-full bg-purple-600 text-white z-10 pointer-events-auto"
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Voice Command Indicator */}
      <div className="text-center pb-4">
        <p className="text-sm md:text-base font-light bg-gray-800 bg-opacity-80 backdrop-blur-md px-4 py-2 rounded-full inline-block">
          {isListening ? 'Listening... Say a section name' : 'Click the mic to enable voice commands'}
        </p>
      </div>
    </div>
  )
}