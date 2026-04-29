import { useState } from 'react'
import './Navbar.css'

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setSidebarOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__brand">NH</div>
        <ul className="navbar__links">
          <li><button onClick={() => scrollTo('home')}>Home</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
          <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
        <button className="navbar__menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <svg width="26" height="26" viewBox="0 -960 960 960" fill="#fff">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
        </button>
      </nav>

      <div className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <button className="sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          <svg width="26" height="26" viewBox="0 -960 960 960" fill="#333">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
        <p className="sidebar__title">Where to?</p>
        <button onClick={() => scrollTo('home')}>Home</button>
        <button onClick={() => scrollTo('about')}>About me</button>
        <button onClick={() => scrollTo('projects')}>Projects</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </aside>
    </>
  )
}

export default Navbar
