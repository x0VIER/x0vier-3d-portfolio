import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float, Environment, Box, Sphere } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  User, 
  Folder, 
  Code, 
  Cloud, 
  Shield, 
  Database, 
  Cpu, 
  Github, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Activity,
  Server,
  Zap
} from 'lucide-react'
import './App.css'

// 3D Terminal Cube Component
function TerminalCube({ position, color, onClick, children }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <Box 
        position={position} 
        args={[1, 1, 1]} 
        onClick={onClick}
        onPointerOver={(e) => e.object.scale.setScalar(1.1)}
        onPointerOut={(e) => e.object.scale.setScalar(1)}
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Box>
      {children && (
        <Text
          position={[position[0], position[1] - 1.5, position[2]]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {children}
        </Text>
      )}
    </Float>
  )
}

// 3D Skills Network
function SkillsNetwork3D() {
  const skills = [
    { name: 'Python', position: [-2, 1, 0], color: '#8b5cf6' },
    { name: 'AWS', position: [2, 1, 0], color: '#a855f7' },
    { name: 'JavaScript', position: [0, 2, 0], color: '#9333ea' },
    { name: 'Docker', position: [-1, -1, 0], color: '#7c3aed' },
    { name: 'Linux', position: [1, -1, 0], color: '#6d28d9' },
    { name: 'Security', position: [0, -2, 0], color: '#5b21b6' }
  ]

  return (
    <group>
      {skills.map((skill, index) => (
        <TerminalCube
          key={skill.name}
          position={skill.position}
          color={skill.color}
          onClick={() => console.log(`Clicked ${skill.name}`)}
        >
          {skill.name}
        </TerminalCube>
      ))}
    </group>
  )
}

// Terminal Command Component
function TerminalCommand({ command, output, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [typedCommand, setTypedCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return
    
    let i = 0
    const typeCommand = () => {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1))
        i++
        setTimeout(typeCommand, 50)
      } else {
        setTimeout(() => setShowOutput(true), 300)
      }
    }
    typeCommand()
  }, [isVisible, command])

  return (
    <div className="mb-4">
      <div className="flex items-center text-green-400 font-mono">
        <span className="text-purple-400">x0vier@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <span className="text-green-400">{typedCommand}</span>
        {isVisible && typedCommand.length < command.length && (
          <span className="animate-pulse">|</span>
        )}
      </div>
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-gray-300"
        >
          {output}
        </motion.div>
      )}
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
            {project.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="text-purple-400 text-sm">{project.category}</p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
      </div>
      
      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-500/30"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{project.year}</span>
        <div className="flex items-center space-x-4">
          <span className="text-purple-400">★ {project.stars}</span>
          <span className="text-green-400">● {project.status}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Main App Component
function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [terminalHistory, setTerminalHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const terminalRef = useRef(null)

  const projects = [
    {
      name: "Python Automation Suite",
      description: "Comprehensive IT automation toolkit with file organization, log analysis, and system health monitoring capabilities.",
      category: "Automation",
      technologies: ["Python", "PowerShell", "Linux", "Windows"],
      year: "2024",
      stars: "15",
      status: "Active",
      icon: <Terminal className="w-5 h-5 text-purple-400" />
    },
    {
      name: "AWS Cloud Infrastructure",
      description: "Enterprise-grade cloud solutions using EC2, S3, Lambda, and Infrastructure as Code with CloudFormation.",
      category: "Cloud",
      technologies: ["AWS", "CloudFormation", "Lambda", "S3"],
      year: "2024",
      stars: "23",
      status: "Active",
      icon: <Cloud className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Cybersecurity Scanner",
      description: "Advanced vulnerability assessment tool using Nmap and OpenVAS for comprehensive security analysis.",
      category: "Security",
      technologies: ["Python", "Nmap", "OpenVAS", "Security"],
      year: "2024",
      stars: "31",
      status: "Active",
      icon: <Shield className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Data Analysis Pipeline",
      description: "Robust data processing system using Pandas, Matplotlib, and Seaborn for advanced analytics.",
      category: "Data Science",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      year: "2024",
      stars: "18",
      status: "Active",
      icon: <Database className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Docker Orchestration",
      description: "Container management and orchestration solutions for scalable application deployment.",
      category: "DevOps",
      technologies: ["Docker", "Kubernetes", "CI/CD", "DevOps"],
      year: "2024",
      stars: "27",
      status: "Active",
      icon: <Server className="w-5 h-5 text-purple-400" />
    },
    {
      name: "AI-Powered IT Tools",
      description: "Machine learning solutions for IT automation, predictive maintenance, and intelligent monitoring.",
      category: "AI/ML",
      technologies: ["Python", "TensorFlow", "AI", "ML"],
      year: "2024",
      stars: "42",
      status: "Active",
      icon: <Zap className="w-5 h-5 text-purple-400" />
    }
  ]

  const skills = [
    { name: "Python", level: 95, projects: 18, icon: <Code className="w-4 h-4" /> },
    { name: "AWS", level: 90, projects: 12, icon: <Cloud className="w-4 h-4" /> },
    { name: "JavaScript", level: 85, projects: 7, icon: <Code className="w-4 h-4" /> },
    { name: "Linux", level: 88, projects: 15, icon: <Terminal className="w-4 h-4" /> },
    { name: "Security", level: 82, projects: 8, icon: <Shield className="w-4 h-4" /> },
    { name: "Docker", level: 87, projects: 10, icon: <Server className="w-4 h-4" /> },
    { name: "PowerShell", level: 90, projects: 4, icon: <Terminal className="w-4 h-4" /> },
    { name: "Database", level: 78, projects: 6, icon: <Database className="w-4 h-4" /> }
  ]

  const commands = {
    help: () => "Available commands: whoami, ls, cat, cd, skills, projects, contact, clear",
    whoami: () => "V Vier (x0VIER) - IT Specialist & Automation Expert",
    ls: () => "about.txt  skills/  projects/  experience/  contact.txt",
    clear: () => { setTerminalHistory([]); return "" },
    skills: () => setCurrentSection('skills'),
    projects: () => setCurrentSection('projects'),
    contact: () => setCurrentSection('contact'),
    about: () => setCurrentSection('about')
  }

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim()
    const output = commands[command] ? commands[command]() : `Command not found: ${command}`
    
    if (output) {
      setTerminalHistory(prev => [...prev, { command: cmd, output }])
    }
    setCurrentCommand('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.3} />
          
          {/* Floating particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <Sphere key={i} position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]} args={[0.02]}>
              <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
            </Sphere>
          ))}
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar - Terminal Style */}
        <div className="w-80 bg-gray-900/90 backdrop-blur-md border-r border-purple-500/30 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-purple-500/30">
                <img 
                  src="/src/assets/x0vier_hexagon_logo.png" 
                  alt="x0VIER Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">x0VIER</h1>
                <p className="text-purple-400 text-sm">IT Specialist</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">ONLINE</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="space-y-2">
              {[
                { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
                { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
                { id: 'projects', label: 'Projects', icon: <Folder className="w-4 h-4" /> },
                { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentSection === item.id
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Input */}
          <div className="p-4 border-t border-purple-500/30">
            <div className="flex items-center space-x-2 text-sm font-mono">
              <span className="text-purple-400">x0vier@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$</span>
              <input
                ref={terminalRef}
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-green-400"
                placeholder="type 'help' for commands"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="p-4 border-t border-purple-500/30">
            <div className="flex space-x-4">
              <a href="https://github.com/x0VIER" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Activity className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {currentSection === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <TerminalCommand 
                      command="cat about.txt"
                      output={
                        <div className="space-y-4">
                          <div className="flex items-center space-x-6 mb-6">
                            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-500/50">
                              <img 
                                src="/src/assets/x0vier_3d_profile_logo.png" 
                                alt="x0VIER 3D Profile" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold text-white mb-2">V Vier</h2>
                              <p className="text-purple-400 text-lg">IT Specialist & Automation Expert</p>
                            </div>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            Certified IT Help Desk Specialist with hands-on experience solving technical issues 
                            and supporting users. Expert in troubleshooting, automation, and cloud technologies.
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            Passionate about infrastructure automation, cloud architecture, and enterprise system 
                            administration. Specializing in Python automation, AWS cloud services, and AI-powered IT tools.
                          </p>
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">99+</div>
                              <div className="text-sm text-gray-400">Repositories</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">5</div>
                              <div className="text-sm text-gray-400">Followers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">10</div>
                              <div className="text-sm text-gray-400">Following</div>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </motion.div>
              )}

              {currentSection === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <TerminalCommand 
                    command="ls -la skills/"
                    output={
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
                        
                        {/* 3D Skills Visualization */}
                        <div className="h-64 mb-8 bg-gray-900/30 rounded-lg border border-purple-500/30">
                          <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} color="#8b5cf6" />
                            <SkillsNetwork3D />
                            <OrbitControls enableZoom={false} />
                            <Environment preset="night" />
                          </Canvas>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-900/50 p-4 rounded-lg border border-purple-500/30"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {skill.icon}
                                  <span className="text-white font-medium">{skill.name}</span>
                                </div>
                                <span className="text-purple-400 text-sm">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
                                />
                              </div>
                              <p className="text-gray-400 text-xs">{skill.projects} projects</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              )}

              {currentSection === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <TerminalCommand 
                    command="find projects/ -type f -name '*.md' | head -6"
                    output={
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
                        <p className="text-gray-400 mb-6">Showcasing 6 of my 99+ repositories</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {projects.map((project, index) => (
                            <ProjectCard key={project.name} project={project} index={index} />
                          ))}
                        </div>
                        
                        <div className="text-center mt-8">
                          <a
                            href="https://github.com/x0VIER"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-all duration-200"
                          >
                            <Github className="w-5 h-5" />
                            <span>View All 99+ Projects</span>
                          </a>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              )}

              {currentSection === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <TerminalCommand 
                    command="cat contact.txt"
                    output={
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
                        <p className="text-gray-300 leading-relaxed mb-8">
                          Ready to collaborate on your next project? Let's discuss how my expertise 
                          in automation, cloud services, and IT support can help solve your technical challenges.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                            <h3 className="text-lg font-semibold text-white mb-4">Professional</h3>
                            <div className="space-y-3">
                              <a href="https://github.com/x0VIER" className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors">
                                <Github className="w-5 h-5" />
                                <span>GitHub Profile</span>
                              </a>
                              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors">
                                <Mail className="w-5 h-5" />
                                <span>Email</span>
                              </a>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                            <h3 className="text-lg font-semibold text-white mb-4">Expertise</h3>
                            <div className="space-y-2 text-sm">
                              <div className="text-purple-400">• IT Infrastructure & Support</div>
                              <div className="text-purple-400">• Cloud Architecture (AWS)</div>
                              <div className="text-purple-400">• Python Automation</div>
                              <div className="text-purple-400">• Cybersecurity Solutions</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
