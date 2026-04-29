import './Projects.css'

const projects = [
  {
    title: 'Calculator',
    description: 'Built following a Udemy course, then refactored with custom styling and improved UX. Uses buttons instead of inputs for better interaction.',
    image: 'https://via.placeholder.com/400x300/61dafb/fff?text=Calculator',
    link: 'https://calcifynh.netlify.app/',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Product Landing Page',
    description: 'Created for freeCodeCamp certification. Features responsive design and modern CSS techniques. Can be extended into a full e-commerce platform.',
    image: 'https://via.placeholder.com/400x300/ffc107/333?text=Landing+Page',
    link: 'https://productlandingpagenh.netlify.app/',
    tech: ['HTML', 'CSS', 'Responsive Design']
  }
]

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <h2 className="section-title">Projects</h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-card__image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  View Project →
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
