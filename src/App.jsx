import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float, Environment, Stars } from '@react-three/drei'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Github, Mail, ExternalLink, Code, Cloud, Shield, Database, Terminal, Cpu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Import assets
import profileImage from './assets/x0vier_profile_3d.png'
import heroBackground from './assets/hero_background.png'
import pythonIcon from './assets/python_icon_3d.png'
import awsIcon from './assets/aws_icon_3d.png'
import jsIcon from './assets/javascript_icon_3d.png'

// 3D Avatar Component
function Avatar3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#4f46e5" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#1e1b4b"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        V VIER
      </Text>
    </Float>
  )
}

// 3D Skills Visualization
function SkillsNetwork() {
  const skills = [
    { name: 'Python', position: [-2, 1, 0], color: '#3776ab' },
    { name: 'AWS', position: [2, 1, 0], color: '#ff9900' },
    { name: 'JavaScript', position: [0, 2, 0], color: '#f7df1e' },
    { name: 'Docker', position: [-1, -1, 0], color: '#2496ed' },
    { name: 'Linux', position: [1, -1, 0], color: '#fcc624' },
    { name: 'Security', position: [0, -2, 0], color: '#e74c3c' }
  ]

  return (
    <group>
      {skills.map((skill, index) => (
        <Float key={skill.name} speed={1 + index * 0.2} rotationIntensity={0.3}>
          <mesh position={skill.position}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial 
              color={skill.color} 
              emissive={skill.color}
              emissiveIntensity={0.3}
            />
          </mesh>
          <Text
            position={[skill.position[0], skill.position[1] - 0.6, skill.position[2]]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        </Float>
      ))}
      
      {/* Connection lines */}
      {skills.map((skill, i) => 
        skills.slice(i + 1).map((otherSkill, j) => (
          <line key={`${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...skill.position,
                  ...otherSkill.position
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#4f46e5" opacity={0.3} transparent />
          </line>
        ))
      )}
    </group>
  )
}

// Project data based on GitHub analysis
const projects = [
  {
    id: 1,
    name: "Python Automation Suite",
    description: "IT automation scripts for file organization, log analysis, and system health checks",
    language: "Python",
    category: "Automation",
    icon: <Terminal className="w-6 h-6" />,
    featured: true
  },
  {
    id: 2,
    name: "AWS Cloud Infrastructure",
    description: "Complete AWS solutions including S3, EC2, Lambda, and CloudFormation IaC",
    language: "CloudFormation",
    category: "Cloud",
    icon: <Cloud className="w-6 h-6" />,
    featured: true
  },
  {
    id: 3,
    name: "Cybersecurity Scanner",
    description: "Vulnerability scanning and analysis using Nmap and OpenVAS",
    language: "Python",
    category: "Security",
    icon: <Shield className="w-6 h-6" />,
    featured: true
  },
  {
    id: 4,
    name: "Data Analysis Pipeline",
    description: "Python data analysis using Pandas, Matplotlib, and Seaborn",
    language: "Python",
    category: "Data",
    icon: <Database className="w-6 h-6" />,
    featured: false
  },
  {
    id: 5,
    name: "PowerShell Automation",
    description: "Windows automation for user management and system administration",
    language: "PowerShell",
    category: "Automation",
    icon: <Cpu className="w-6 h-6" />,
    featured: false
  },
  {
    id: 6,
    name: "Docker Containerization",
    description: "Container orchestration and management solutions",
    language: "Docker",
    category: "DevOps",
    icon: <Code className="w-6 h-6" />,
    featured: false
  }
]

function App() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const scrollToSection = (section) => {
    setCurrentSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={profileImage} alt="V Vier" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold">V VIER</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('hero')} className="hover:text-purple-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-purple-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-purple-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition-colors">Contact</button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="border-white/20 hover:bg-white/10"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
            <Avatar3D />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="night" />
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              V VIER
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              IT Specialist & Automation Expert
            </p>
            <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
              Certified IT Help Desk Specialist with expertise in Python automation, 
              AWS cloud services, and system administration. Passionate about solving 
              technical challenges through innovative automation solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-white/20 hover:bg-white/10"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={profileImage} 
                  alt="V Vier Profile" 
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-300">
                  As a Certified IT Specialist with hands-on experience in help desk operations, 
                  I specialize in solving complex technical issues and supporting users across 
                  diverse environments.
                </p>
                <p className="text-lg text-gray-300">
                  My passion lies in automation and cloud technologies, with extensive experience 
                  in Python scripting, AWS services, and system administration. I've developed 
                  99+ repositories covering everything from basic automation to advanced cloud 
                  infrastructure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python Expert</Badge>
                  <Badge variant="secondary">AWS Certified</Badge>
                  <Badge variant="secondary">IT Support</Badge>
                  <Badge variant="secondary">Automation</Badge>
                  <Badge variant="secondary">Cloud Architecture</Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
            
            <div className="h-96 mb-12">
              <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} />
                <SkillsNetwork />
                <OrbitControls enableZoom={false} />
                <Environment preset="night" />
              </Canvas>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src={pythonIcon} alt="Python" className="w-8 h-8" />
                    Programming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Python</span>
                      <span className="text-purple-400">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>JavaScript</span>
                      <span className="text-purple-400">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PowerShell</span>
                      <span className="text-purple-400">Advanced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src={awsIcon} alt="AWS" className="w-8 h-8" />
                    Cloud & DevOps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>AWS Services</span>
                      <span className="text-purple-400">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Docker</span>
                      <span className="text-purple-400">Advanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Linux Admin</span>
                      <span className="text-purple-400">Advanced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-red-400" />
                    Security & IT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vulnerability Scanning</span>
                      <span className="text-purple-400">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IT Support</span>
                      <span className="text-purple-400">Expert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Security</span>
                      <span className="text-purple-400">Advanced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
            <p className="text-center text-gray-400 mb-12">
              Showcasing 6 of my 99+ repositories - from automation scripts to cloud infrastructure
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {project.icon}
                        <Badge variant={project.featured ? "default" : "secondary"}>
                          {project.language}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-purple-400 text-purple-400">
                          {project.category}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 hover:bg-white/10"
                onClick={() => window.open('https://github.com/x0VIER', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                View All 99+ Projects on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
            <div className="text-center space-y-8">
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to collaborate on your next project? Let's discuss how my expertise 
                in automation, cloud services, and IT support can help solve your technical challenges.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://github.com/x0VIER', '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 hover:bg-white/10"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 V Vier (x0VIER). Built with React, Three.js, and passion for technology.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
