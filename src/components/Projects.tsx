import './Projects.css'

const projects = [
  {
    title: 'Car Dealership Review Portal',
    description: 'A comprehensive review platform for car dealerships. Allows users to rate and review dealerships, view ratings, and make informed decisions when purchasing vehicles.',
    image: '',
    link: '#',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'E-Commerce Website',
    description: 'A modern e-commerce platform built with responsive design and modern CSS techniques. Features product listings, shopping cart functionality, and a clean user interface.',
    image: '',
    link: 'https://verdant-vibes.netlify.app',
    tech: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    title: 'Calculator',
    description: 'Built following a Udemy course, then refactored with custom styling and improved UX. Uses buttons instead of inputs for better interaction.',
    image: '',
    link: 'https://calcifynh.netlify.app/',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Personal Budget Tracker',
    description: 'An intuitive budget tracking application that helps users manage their finances. Features expense categorization, spending insights, and monthly budget planning.',
    image: '',
    link: '#',
    tech: ['React', 'Chart.js', 'LocalStorage']
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
