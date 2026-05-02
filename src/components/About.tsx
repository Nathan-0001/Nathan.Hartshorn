import { useEffect, useRef, useState } from 'react'
import './About.css'

interface Skill {
  name: string
  color: string
}

const skills: Skill[] = [
  { name: 'HTML5', color: '#E44D26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'React', color: '#61DAFB' },
  { name: 'GitHub', color: '#181717' },
  { name: 'Git', color: '#F05032' },
  { name: 'Python', color: '#3776AB' },
  { name: 'AI', color: '#FF6B6B' },
]

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about__container">
        <h2 className="section-title">About Me</h2>
        <p className="about__text">
          I am a Fullstack Developer with a passion for creating dynamic and responsive web applications.
          I have experience in HTML, CSS, JavaScript, and React, and I am always eager to learn new
          technologies and improve my skills.
        </p>
        <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
          {skills.map(skill => (
            <div key={skill.name} className="keyboard-key" style={{ borderBottomColor: skill.color }}>
              <span className="keyboard-key__name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
