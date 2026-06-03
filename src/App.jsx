import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import './App.css'

const Projects = lazy(() => import('./components/Projects'))
const GitHubSection = lazy(() => import('./components/GitHub'))
const Certifications = lazy(() => import('./components/Certifications'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [language, setLanguage] = useState('en')
  const canvasRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode)
  }, [lightMode])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['home', 'about', 'projects', 'contact']
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.75) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-fade--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.section-fade:not(.section-fade--visible)').forEach(el => observer.observe(el))
    }

    observe()

    const mutationObserver = new MutationObserver(observe)
    const main = document.querySelector('main')
    if (main) mutationObserver.observe(main, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor(canvas, ctx, lightMode) {
        this.cvs = canvas
        this.c = ctx
        this.isLight = lightMode
        this.x = Math.random() * this.cvs.width
        this.y = Math.random() * this.cvs.height
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.size = Math.random() * 3 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > this.cvs.width) this.vx *= -1
        if (this.y < 0 || this.y > this.cvs.height) this.vy *= -1
      }

      draw() {
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.c.fillStyle = this.isLight ? '#000000' : '#ffffff'
        this.c.globalAlpha = 0.5
        this.c.fill()
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle(canvas, ctx, lightMode))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [lightMode])

  return (
    <div className={`app ${lightMode ? 'light-mode' : ''}`}>
      <canvas ref={canvasRef} className="bg-canvas" />
      <Navbar
        scrolled={scrolled}
        lightMode={lightMode}
        onToggleLight={() => setLightMode(!lightMode)}
        activeSection={activeSection}
        language={language}
        onToggleLang={() => setLanguage(prev => prev === 'en' ? 'es' : 'en')}
      />
      <main>
        <Header language={language} />
        <About language={language} />
        <Suspense fallback={null}>
          <Projects language={language} />
          <GitHubSection />
          <Certifications language={language} />
          <Contact language={language} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer language={language} />
      </Suspense>
    </div>
  )
}

export default App
