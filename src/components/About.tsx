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
  { name: 'GitHub', color: '#8B5CF6' },
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
        <h2 className="section-title">My Stack</h2>
        <p className="about__text">Technologies and tools I work with.</p>
        <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
          {skills.map((skill, i) => {
            const floatDown = [1, 3, 5, 7].includes(i)
            return (
              <div
                key={skill.name}
                className={`keyboard-key ${isVisible ? (floatDown ? 'key--float-down' : 'key--float-up') : ''}`}
                style={{
                  borderBottomColor: skill.color,
                  '--key-shadow': skill.color,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <span className="keyboard-key__name">{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
