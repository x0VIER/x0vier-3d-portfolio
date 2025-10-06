import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Mail, 
  FileText, 
  BookOpen, 
  BarChart3,
  ExternalLink,
  Terminal,
  User,
  Code,
  Shield,
  Cloud,
  Database,
  Server,
  Zap
} from 'lucide-react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('main')
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // Typing animation effect
  useEffect(() => {
    const text = "whoami"
    let i = 0
    const typeTimer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeTimer)
      }
    }, 150)

    // Cursor blinking
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(typeTimer)
      clearInterval(cursorTimer)
    }
  }, [])

  const skills = [
    { name: 'PowerShell', projects: 4, percentage: 90, icon: <Terminal className="w-4 h-4" /> },
    { name: 'Windows Server', projects: 4, percentage: 85, icon: <Server className="w-4 h-4" /> },
    { name: 'Security', projects: 4, percentage: 80, icon: <Shield className="w-4 h-4" /> },
    { name: 'Python', projects: 4, percentage: 88, icon: <Code className="w-4 h-4" /> },
    { name: 'Linux', projects: 4, percentage: 85, icon: <Terminal className="w-4 h-4" /> },
    { name: 'Cloud/AWS', projects: 4, percentage: 82, icon: <Cloud className="w-4 h-4" /> },
    { name: 'AI & LLM', projects: 4, percentage: 75, icon: <Zap className="w-4 h-4" /> },
    { name: 'Database', projects: 1, percentage: 78, icon: <Database className="w-4 h-4" /> }
  ]

  const experiences = [
    {
      title: "Help Desk & Support",
      items: [
        "Hardware/software troubleshooting",
        "Remote & on-site support", 
        "Knowledge base documentation",
        "Ticket management"
      ]
    },
    {
      title: "System Administration",
      items: [
        "Windows/Linux server management",
        "Active Directory & Group Policy",
        "Security policies & monitoring",
        "PowerShell/Python automation"
      ]
    },
    {
      title: "Cloud & Automation",
      items: [
        "AWS infrastructure (EC2, S3, Lambda)",
        "Infrastructure as Code",
        "CI/CD pipelines & DevOps",
        "AI-powered IT tools"
      ]
    }
  ]

  const projects = [
    {
      name: "Python Automation Suite",
      description: "Comprehensive IT automation toolkit with file organization, log analysis, and system health monitoring.",
      tech: ["Python", "PowerShell", "Linux"],
      stars: 15,
      url: "https://github.com/x0VIER/python-automation"
    },
    {
      name: "AWS Cloud Infrastructure",
      description: "Enterprise-grade cloud solutions using EC2, S3, Lambda, and Infrastructure as Code.",
      tech: ["AWS", "CloudFormation", "Lambda"],
      stars: 23,
      url: "https://github.com/x0VIER/aws-infrastructure"
    },
    {
      name: "Cybersecurity Scanner",
      description: "Advanced vulnerability assessment tool using Nmap and OpenVAS for security analysis.",
      tech: ["Python", "Nmap", "Security"],
      stars: 31,
      url: "https://github.com/x0VIER/security-scanner"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Network lines background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="#8b5cf6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with logo */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <img 
                  src="/src/assets/x0vier_hexagon_logo.png" 
                  alt="x0VIER Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
            <div className="bg-purple-600 text-white px-4 py-1 rounded text-sm font-mono">
              ONLINE
            </div>
          </div>

          <div className="mb-6">
            <div className="text-green-400 font-mono text-left max-w-xs mx-auto">
              $ {typedText}
              {showCursor && <span className="animate-pulse">|</span>}
            </div>
          </div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            V Vier
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            IT Professional
          </motion.h2>

          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Certified IT professional specializing in infrastructure automation, cloud architecture, 
            and enterprise system administration. Expert in troubleshooting, Windows/Linux environments, 
            and AI-powered automation tools.
          </motion.p>

          {/* GitHub Stats */}
          <motion.div 
            className="flex justify-center space-x-8 md:space-x-16 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">110</div>
              <div className="text-gray-400 text-sm">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">5</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">10</div>
              <div className="text-gray-400 text-sm">Following</div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <a
              href="https://github.com/x0VIER"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600/20 border border-green-500/50 px-6 py-3 rounded-lg hover:bg-green-600/30 transition-all duration-300 group"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">1</span>
            </a>
            
            <a
              href="mailto:contact@x0vier.dev"
              className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/50 px-6 py-3 rounded-lg hover:bg-blue-600/30 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
              <span className="bg-blue-500 text-black px-2 py-1 rounded text-xs font-bold">2</span>
            </a>
            
            <a
              href="/resume.pdf"
              className="flex items-center space-x-2 bg-yellow-600/20 border border-yellow-500/50 px-6 py-3 rounded-lg hover:bg-yellow-600/30 transition-all duration-300 group"
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">3</span>
            </a>
            
            <a
              href="/blog"
              className="flex items-center space-x-2 bg-purple-600/20 border border-purple-500/50 px-6 py-3 rounded-lg hover:bg-purple-600/30 transition-all duration-300 group"
            >
              <BookOpen className="w-5 h-5" />
              <span>Blog</span>
              <span className="bg-purple-500 text-black px-2 py-1 rounded text-xs font-bold">4</span>
            </a>
            
            <a
              href="/dashboard"
              className="flex items-center space-x-2 bg-cyan-600/20 border border-cyan-500/50 px-6 py-3 rounded-lg hover:bg-cyan-600/30 transition-all duration-300 group"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
              <span className="bg-cyan-500 text-black px-2 py-1 rounded text-xs font-bold">5</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="text-green-400 font-mono mb-4">$ ls ~/skills</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {skill.icon}
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-purple-400 font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ delay: 2 + index * 0.1, duration: 1 }}
                  />
                </div>
                <div className="text-sm text-gray-400">{skill.projects} projects</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Projects Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="text-green-400 font-mono mb-4">$ cat ~/recent_projects</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + index * 0.2, duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-400">★ {project.stars}</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <div className="text-green-400 font-mono mb-4">$ cat ~/experience</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.7 + index * 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-purple-400">{exp.title}</h3>
                <ul className="space-y-2">
                  {exp.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-sm flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
        >
          <div className="text-green-400 font-mono mb-4">$ echo $CONTACT</div>
          <p className="text-gray-300 text-lg mb-8">
            Open to IT infrastructure, system administration, and cloud engineering roles.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/x0VIER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="mailto:contact@x0vier.dev"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            Made with <span className="text-purple-400">♥</span> by x0VIER
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default App
