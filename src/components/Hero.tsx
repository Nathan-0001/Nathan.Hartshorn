import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.size = Math.random() * 3 + 1
        this.color = ['#d0d335', '#3ff4d0', '#e3462f'][Math.floor(Math.random() * 3)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.globalAlpha = 0.6
        ctx!.fill()
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle())

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.globalAlpha = 1
      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Animation sequence
    const timer1 = setTimeout(() => setShowIntro(false), 2500)
    const timer2 = setTimeout(() => setShowMain(true), 3500)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <header id="home" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__content">
        {showIntro && (
          <div className="hero__intro">
            <h1 className="hero__name animate-slide">Nathan Hartshorn</h1>
            <h2 className="hero__title animate-slide-delay">Fullstack Developer</h2>
          </div>
        )}
        {showMain && (
          <div className="hero__main animate-fade-in">
            <h2 className="hero__main-title">Fullstack Developer</h2>
            <p className="hero__main-desc">I am a Fullstack Developer with a passion for creating dynamic and responsive web applications. I have experience in HTML, CSS, JavaScript, and React, and I am always eager to learn new technologies and improve my skills.</p>
          </div>
        )}
      </div>
    </header>
  )
}

export default Hero
