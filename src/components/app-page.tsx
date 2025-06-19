'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Mic,
  MicOff,
  Home,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import avatarImage from "@/public/avatar.jpg";

/**
 * Interface for the SpeechRecognition API, which allows for voice command recognition.
 */
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

/**
 * Constructor interface for creating new SpeechRecognition instances.
 */
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

/**
 * Interface for handling errors in the SpeechRecognition API.
 */
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

/**
 * Sections of the portfolio, each with a name and an icon.
 * You can add or remove sections by modifying this array.
 */
const sections = [
  { name: "Home", icon: Home },
  { name: "Profile", icon: User },
  { name: "Skills", icon: Code },
  { name: "Projects", icon: Briefcase },
  { name: "Experience", icon: Award },
  { name: "Education", icon: GraduationCap },
];

/**
 * Skills data with name and proficiency level.
 * Modify this array to update the skills displayed.
 */
const skills = [
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 80 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 75 },
  { name: "AI Tools", level: 90 },
];

/**
 * Projects data including name, description, technologies used, and star rating.
 * Add or remove projects by editing this array.
 */
const projects = [
  {
    name: "Personal Website",
    description:
      "Developed my personal website to showcase my portfolio and blog.",
    techs: ["Next.js", "Vercel"],
    stars: 150,
  },
  {
    name: "AI Voice Assistant 'Neptune'",
    description:
      "Created an AI voice assistant capable of performing various tasks through voice commands.",
    techs: ["Python", "TensorFlow", "SpeechRecognition"],
    stars: 200,
  },
  {
    name: "AI Integrated Web Scraper",
    description:
      "Built a web scraper integrated with AI to extract and analyze data from websites.",
    techs: ["Python", "BeautifulSoup", "TensorFlow"],
    stars: 175,
  },
  {
    name: "Personal AGI",
    description:
      "Developed a personal AGI using local models to create agents for handling tasks.",
    techs: ["Python", "TensorFlow", "PyTorch"],
    stars: 220,
  },
  {
    name: "Cinnamon Roll E-commerce Website",
    description: "Created a website for my wife to sell cinnamon rolls online.",
    techs: ["Shopify", "JavaScript"],
    stars: 130,
  },
  {
    name: "Tech Startup",
    description:
      "Working on a tech startup with a cohort of best friends/partners.",
    techs: ["Various"],
    stars: 100,
  },
];

/**
 * Professional experiences with role, company, duration, and description.
 * Update this array to reflect new experiences.
 */
const experiences = [
  {
    role: "Tech 1 - Application Services",
    company: "Nordstrom",
    duration: "Oct 2021 - Present",
    description:
      "Supporting End User Support and Application Services, focusing on DevOps oriented work. Transitioned from direct support to kanban-based development tasks, building and maintaining internal applications.",
  },
  {
    role: "Tech 1 Contractor",
    company: "Nordstrom",
    duration: "Mar 2020 - Oct 2021",
    description:
      "Provided End User Support as a contractor, handling technical support while building foundation for future development work.",
  },
];

/**
 * Education history with degree, school, year, focus, and skills.
 * Modify this array to update educational background.
 */
const education = [
  {
    degree: "Self-Taught Development",
    school: "Continuous Learning",
    year: "2023 - Present",
    focus:
      "Full Stack Development, AI Integration, and Modern Web Technologies",
    skills: ["TypeScript", "React", "Python", "Node.js"],
  },
  {
    degree: "Technical Foundation",
    school: "Hands-on Experience",
    year: "2001 - Present",
    focus:
      "Started with PC building at age 9, evolved into software development",
    skills: ["Hardware", "Troubleshooting", "System Administration"],
  },
];

/**
 * Chart data for skills with name and hours spent.
 * Update this array to change the chart representation.
 */
const chartdata = [
  { name: "React", hours: 450 },
  { name: "TypeScript", hours: 390 },
  { name: "Node.js", hours: 370 },
  { name: "GraphQL", hours: 280 },
  { name: "Python", hours: 220 },
];

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export function BlockPage() {
  // State for managing the active section, listening status, and rotation angle.
  const [activeSection, setActiveSection] = useState("Home");
  const [isListening, setIsListening] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showCommands, setShowCommands] = useState(false);
  const controls = useAnimation();

  // Reference for the SpeechRecognition instance.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Define rotateToSection first to avoid circular dependency
  const rotateToSection = useCallback((sectionName: string) => {
    const sectionIndex = sections.findIndex(
      (section) => section.name === sectionName,
    );
    if (sectionIndex !== -1) {
      const newAngle = -(sectionIndex * (360 / sections.length));
      setRotationAngle(newAngle);
      controls.start({
        rotate: newAngle,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      });
    }
  }, [controls]);

  const handleVoiceCommand = useCallback((command: string) => {
    const sectionMatch = sections.find((section) =>
      command.includes(section.name.toLowerCase()),
    );
    if (sectionMatch) {
      setActiveSection(sectionMatch.name);
      rotateToSection(sectionMatch.name);
    }
  }, [setActiveSection, rotateToSection]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      // Initialize the SpeechRecognition API.
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const command = event.results[i][0].transcript
                .toLowerCase()
                .trim();
              handleVoiceCommand(command);
            }
          }
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [handleVoiceCommand]);

  /**
   * Toggles the listening state for voice commands.
   */
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  /**
   * Components for each section of the portfolio.
   * Modify the JSX within each function to change the content and style of the sections.
   */
  const sectionComponents = {
    Home: () => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Welcome to My Immersive Portfolio
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore my professional journey through an interactive experience.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.slice(1).map((section) => (
            <motion.button
              key={section.name}
              className="p-4 bg-purple-600 rounded-lg text-white text-sm md:text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(section.name);
                rotateToSection(section.name);
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
            <motion.div 
              className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.8 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={avatarImage}
                alt="Lee Dunn"
                width={128}
                height={128}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">Lee Dunn</h2>
              <p className="text-gray-400">
                Developer & Designer | AI Enthusiast
              </p>
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
            My journey in technology began at age 9, building PCs and developing
            a deep fascination with computing. Now at 31, I&apos;ve evolved into
            a Developer and Designer with a passion for emerging technologies
            and AI. While I&apos;m self-taught without formal education, my
            practical experience and dedication to continuous learning have
            equipped me with strong skills in TypeScript, Python, React, and
            Node.js. Currently seeking to transition into a Junior Engineering
            role while pursuing entrepreneurial ambitions in the startup space.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="https://github.com/OriginalLeeDunn/originalleedunn.me"
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
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative h-64 md:h-80">
                {chartdata.map((item, index) => {
                  const angle =
                    (index / chartdata.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 100;
                  const x = Math.cos(angle) * radius + 120;
                  const y = Math.sin(angle) * radius + 120;
                  return (
                    <div
                      key={item.name}
                      className="absolute"
                      style={{ left: x, top: y }}
                    >
                      <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                      <p className="text-xs mt-1">{item.name}</p>
                      <p className="text-xs">{item.hours} hrs</p>
                    </div>
                  );
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
              <h4 className="text-lg font-semibold">{project.name}</h4>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
                  <h4 className="text-lg font-semibold text-purple-400">
                    {edu.degree}
                  </h4>
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
            <h4 className="text-lg font-semibold mb-2">
              Continuous Learning Approach
            </h4>
            <p className="text-gray-300">
              While I don&apos;t have traditional education credentials, my
              learning journey is driven by hands-on experience, practical
              application, and staying current with emerging technologies. I
              believe in learning by doing and constantly challenging myself
              with new projects and technologies.
            </p>
          </motion.div>
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Menu Button */}
        <motion.button
          className="fixed bottom-20 right-8 p-4 rounded-full bg-purple-800/80 hover:bg-pink-600/80 backdrop-blur-sm border border-gray-700/30 transition-all duration-300 shadow-lg"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCommands(true)}
          aria-label="Show voice commands"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {sectionComponents[
              activeSection as keyof typeof sectionComponents
            ]()}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {showCommands && (
            <Modal onClose={() => setShowCommands(false)}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Voice Commands</h2>
                  <button
                    onClick={() => setShowCommands(false)}
                    className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li
                      key={section.name}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <section.icon className="w-5 h-5" />
                      <span>&quot;Go to {section.name}&quot;</span>
                    </li>
                  ))}
                  <li className="text-gray-300">
                    Press &quot;<b>V</b>&quot; to Toggle Voice Controls on/off
                  </li>
                </ul>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </main>

      {/* Smooth Rotating Navigation */}
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="relative w-[400px] h-[400px]"
          role="navigation"
          aria-label="Section Navigation"
        >
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full border border-purple-500/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm" />

          <motion.div
            className="absolute inset-0"
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformOrigin: "center center" }}
            layoutId="navigation-wheel"
          >
            {sections.map((section, index) => {
              const angle = (index / sections.length) * 360;
              const iconRadius = 140;
              const iconX = Math.sin((angle * Math.PI) / 180) * iconRadius;
              const iconY = -Math.cos((angle * Math.PI) / 180) * iconRadius;

              return (
                <motion.div
                  key={section.name}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${iconX}px - 32px)`,
                    top: `calc(50% + ${iconY}px - 32px)`,
                  }}
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    hover: { scale: 1.05 },
                    initial: { scale: 1 },
                  }}
                >
                  {/* Navigation Button */}
                  <motion.button
                    className={`
                      w-16 h-16 rounded-full 
                      flex items-center justify-center 
                      transition-all duration-300
                      border-2
                      ${
                        activeSection === section.name
                          ? "bg-purple-600 border-purple-400/30 shadow-lg shadow-purple-500/20"
                          : "bg-gray-800/80 border-gray-700/30 hover:bg-gray-700/80 hover:border-gray-600/30"
                      }
                    `}
                    style={{
                      boxShadow:
                        activeSection === section.name
                          ? "0 0 20px rgba(147, 51, 234, 0.2)"
                          : "none",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setActiveSection(section.name);
                      rotateToSection(section.name);
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" ||
                        e.key === " " ||
                        e.key === "v" ||
                        e.key === "V"
                      ) {
                        setActiveSection(section.name);
                        rotateToSection(section.name);
                        setIsListening(!isListening);
                      }
                    }}
                    role="tab"
                    aria-selected={activeSection === section.name}
                    aria-controls={`section-${section.name.toLowerCase()}`}
                    tabIndex={0}
                  >
                    <motion.div
                      style={{
                        rotate: `${-rotationAngle}deg`,
                      }}
                      variants={{
                        hover: { rotate: `${-rotationAngle + 360}deg` },
                        initial: { rotate: `${-rotationAngle}deg` },
                      }}
                      transition={{ duration: 0.3 }}
                      className={`
                        transition-all duration-300
                        ${
                          activeSection === section.name
                            ? "text-white"
                            : "text-gray-400"
                        }
                      `}
                    >
                      <section.icon className="w-7 h-7" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center Microphone Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={false}
            animate={{
              scale: isListening ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isListening ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              onKeyDown={(e) => {
                if (e.key === "v" || e.key === "V") {
                  toggleListening();
                  e.stopPropagation();
                }
              }}
              className={`
                p-6 rounded-full 
                transition-all duration-300
                border-2
                ${
                  isListening
                    ? "bg-purple-600 border-purple-400/30 shadow-lg shadow-purple-500/30"
                    : "bg-gray-800/80 border-gray-700/30 hover:bg-gray-700/80 hover:border-gray-600/30"
                }
                text-white z-10 pointer-events-auto
              `}
              style={{
                boxShadow: isListening
                  ? "0 0 30px rgba(147, 51, 234, 0.3)"
                  : "none",
              }}
              aria-label={
                isListening ? "Stop voice commands" : "Start voice commands"
              }
              role="switch"
              aria-checked={isListening}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isListening ? "mic-off" : "mic-on"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    ${isListening ? "text-white" : "text-gray-300"}
                  `}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Voice Command Indicator */}
      <div className="relative flex items-center justify-center pb-4">
        <motion.div
          className="inline-block"
          animate={{
            scale: isListening ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isListening ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          <motion.p
            className={`text-sm md:text-base font-light px-4 py-2 rounded-full inline-flex items-center gap-2 transition-all duration-300 ${
              isListening
                ? "bg-purple-600/30 backdrop-blur-md"
                : "bg-gray-800/80 backdrop-blur-md"
            }`}
            initial={false}
            animate={{
              backgroundColor: isListening
                ? "rgba(147, 51, 234, 0.3)"
                : "rgba(31, 41, 55, 0.8)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isListening ? 1 : 0 }}
              exit={{ opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11H9a2 2 0 012-2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0h2m6 2a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2m6-2h2"
                />
              </svg>
            </motion.span>
            {isListening ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 3 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-center">
                  Listening for voice commands...
                </div>
                <br />
                Press &ldquo;<b>Space</b>&rdquo; or &ldquo;<b>V</b>&rdquo; to toggle voice commands...
              </motion.span>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-center">
                  Click the microphone to enable voice commands then navigate
                  the site <br />
                  or <br />
                  Use traditional navigation methods like clicking the buttons
                </span>
              </div>
            )}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
