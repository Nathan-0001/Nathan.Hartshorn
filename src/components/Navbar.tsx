import { useState } from 'react'
import './Navbar.css'

const Navbar = ({ scrolled, lightMode, onToggleLight }: { scrolled: boolean; lightMode: boolean; onToggleLight: () => void }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setSidebarOpen(false)
  }

  return (
    <>
      <div className="nh-brand">NH</div>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <ul className="navbar__links">
          <li><button onClick={() => scrollTo('home')}>Home</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
          <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
        <button className="theme-toggle" onClick={onToggleLight} aria-label="Toggle theme">
          {lightMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </button>
        <button className="navbar__menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 -960 960 960" fill={lightMode ? '#333' : '#fff'}>
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
        </button>
      </nav>

      <div className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <button className="sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          <svg width="26" height="26" viewBox="0 -960 960 960" fill={lightMode ? '#333' : '#fff'}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </button>
        <p className="sidebar__title">Where to?</p>
        <button onClick={() => scrollTo('home')}>Home</button>
        <button onClick={() => scrollTo('about')}>About me</button>
        <button onClick={() => scrollTo('projects')}>Projects</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
        <hr />
        <button onClick={onToggleLight} className="sidebar__theme">
          {lightMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </aside>
    </>
  )
}

export default Navbar