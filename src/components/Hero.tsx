import { useEffect, useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <header id="home" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__content">
        <h1 className="hero__name">Nathan Hartshorn</h1>
        <h2 className="hero__title">Fullstack Developer</h2>
      </div>
    </header>
  )
}

export default Hero
