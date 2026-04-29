import { useEffect, useRef, useState } from 'react'
import './About.css'

interface Skill {
  name: string
  level: number
  color: string
  icon: string
}

const skills: Skill[] = [
  { name: 'HTML5', level: 100, color: '#E44D26', icon: '🌐' },
  { name: 'CSS3', level: 100, color: '#1758A7', icon: '🎨' },
  { name: 'JavaScript', level: 100, color: '#FFC107', icon: '⚡' },
  { name: 'TypeScript', level: 1, color: '#3178C6', icon: '📘' },
  { name: 'React', level: 100, color: '#61dafb', icon: '⚛️' },
  { name: 'GitHub', level: 100, color: '#000', icon: '🐙' },
  { name: 'Git', level: 75, color: '#f34f29', icon: '🔧' },
  { name: 'Next.js', level: 1, color: '#000', icon: '▲' },
  { name: 'Python', level: 50, color: '#3776AB', icon: '🐍' },
]

const SkillBar = ({ skill, isVisible }: { skill: Skill; isVisible: boolean }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(skill.level), 100)
      return () => clearTimeout(timer)
    } else {
      setWidth(0)
    }
  }, [isVisible, skill.level])

  return (
    <div className="skill">
      <div className="skill__header">
        <span className="skill__icon">{skill.icon}</span>
        <span className="skill__name">{skill.name}</span>
        <span className="skill__percent">{width}%</span>
      </div>
      <div className="skill__bar">
        <div
          className="skill__fill"
          style={{ width: `${width}%`, backgroundColor: skill.color }}
        />
      </div>
    </div>
  )
}

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
          I am a Front-End Developer with a passion for creating dynamic and responsive web applications.
          I have experience in HTML, CSS, JavaScript, and React, and I am always eager to learn new
          technologies and improve my skills.
        </p>
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
