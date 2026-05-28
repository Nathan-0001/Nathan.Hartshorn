import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import './App.css'

const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode)
  }, [lightMode])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      private cvs: HTMLCanvasElement
      private c: CanvasRenderingContext2D
      private isLight: boolean

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lightMode: boolean) {
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
      <Navbar scrolled={scrolled} lightMode={lightMode} onToggleLight={() => setLightMode(!lightMode)} />
      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App