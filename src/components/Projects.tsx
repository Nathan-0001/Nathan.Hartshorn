import './Projects.css'

const projects = [
  {
    title: 'Car Dealership Review Portal',
    description: 'A full-stack review platform featuring user authentication, CRUD reviews with star ratings, search and filter by dealership location/name, and an admin dashboard for managing listings. Built with a REST API backend and a responsive React frontend.',
    image: '',
    link: '#',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'E-Commerce Website',
    description: 'A responsive e-commerce store built with pure HTML and CSS, featuring product catalog with categories, a persistent shopping cart, and a clean mobile-first layout using CSS Grid and Flexbox. No frameworks — just modern vanilla CSS.',
    image: '',
    link: 'https://verdant-vibes.netlify.app',
    tech: ['HTML', 'CSS', 'Responsive Design']
  },
  {
    title: 'Calculator',
    description: 'A keyboard-friendly calculator with operator chaining, decimal support, and responsive button layout. Refactored from a course project with custom styling, CSS transitions, and full keyboard input support for a native-feeling UX.',
    image: '',
    link: 'https://calcifynh.netlify.app/',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Personal Budget Tracker',
    description: 'A single-page budget tracker with add/edit/delete expenses, category breakdowns, and interactive Chart.js visualizations. All data persists in localStorage — no backend needed. Features monthly budgeting with spending limits and progress tracking.',
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
