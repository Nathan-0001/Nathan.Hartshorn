import translations from '../translations'
import './Projects.css'

const techItems = [
  ['React', 'Node.js', 'MongoDB'],
  ['HTML', 'CSS', 'Responsive Design'],
  ['HTML', 'CSS', 'JavaScript'],
  ['React', 'Chart.js', 'LocalStorage'],
]

const Projects = ({ language }) => {
  const t = translations[language].projects

  return (
    <section id="projects" className="projects section-fade">
      <div className="projects__container">
        <h2 className="section-title">{t.title}</h2>
        <div className="projects__grid">
          {t.items.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__tech">
                  {techItems[index].map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a
                  href={['#', 'https://verdant-vibes.netlify.app', 'https://calcifynh.netlify.app/', '#'][index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  {t.view}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
