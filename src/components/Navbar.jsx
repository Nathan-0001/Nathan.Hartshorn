import { useState, useRef, useEffect, useCallback } from 'react'
import translations from '../translations'
import './Navbar.css'

const navItems = [
  { id: 'home', labelKey: 'home' },
  { id: 'about', labelKey: 'about' },
  { id: 'projects', labelKey: 'projects' },
  { id: 'contact', labelKey: 'contact' },
]

const Navbar = ({ scrolled, lightMode, onToggleLight, activeSection, language, onToggleLang }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0, opacity: 0 })
    const linksRef = useRef(null)
    const t = translations[language].nav

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setSidebarOpen(false)
    }

    const updateHoverBubble = (index) => {
        if (!linksRef.current) return
        const buttons = linksRef.current.querySelectorAll('.navbar__link')
        if (!buttons[index]) return
        const btn = buttons[index]
        setHoverStyle({ left: btn.offsetLeft, width: btn.offsetWidth, opacity: 1 })
    }

    const handleMouseEnter = (idx) => updateHoverBubble(idx)

    const handleMouseLeave = () => setHoverStyle(prev => ({ ...prev, opacity: 0 }))

    const updateIndicator = useCallback((index) => {
        if (!linksRef.current) return
        const buttons = linksRef.current.querySelectorAll('.navbar__link')
        if (!buttons[index]) return
        const btn = buttons[index]
        const w = 20
        setIndicatorStyle({
            left: btn.offsetLeft + (btn.offsetWidth - w) / 2,
            width: w,
        })
    }, [])

    useEffect(() => {
        const activeIdx = navItems.findIndex(item => item.id === activeSection)
        if (activeIdx !== -1) updateIndicator(activeIdx)
    }, [activeSection, updateIndicator])

    return (
        <>
            <div className="nh-brand">Nathan.dev</div>

            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <ul className="navbar__links" ref={linksRef} onMouseLeave={handleMouseLeave}>
                    <div className="navbar__indicator" style={{ transform: `translateX(${indicatorStyle.left}px)`, width: indicatorStyle.width }} />
                    <div className="navbar__hover-bubble" style={{ transform: `translateX(${hoverStyle.left}px)`, width: hoverStyle.width, opacity: hoverStyle.opacity }} />
                    {navItems.map((item, i) => (
                        <li key={item.id}>
                            <button
                                className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                                onClick={() => scrollTo(item.id)}
                                onMouseEnter={() => handleMouseEnter(i)}
                            >
                                {t[item.labelKey]}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="navbar__social">
                    <a href="https://www.linkedin.com/in/nathan-hartshorn/" target="_blank" rel="noopener noreferrer" className="navbar__social-link" aria-label="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a href="https://github.com/Nathan-0001" target="_blank" rel="noopener noreferrer" className="navbar__social-link" aria-label="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
                <button className="navbar__menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                    <svg width="22" height="22" viewBox="0 -960 960 960" fill={lightMode ? '#333' : '#fff'}>
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                </button>
            </nav>

            <div className="top-right-bubble">
                <button className="theme-switch" onClick={onToggleLight} aria-label="Toggle theme">
                    <svg className="theme-switch__moon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    <span className={`theme-switch__thumb ${lightMode ? 'theme-switch__thumb--light' : ''}`} />
                    <svg className="theme-switch__sun" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                </button>
                <button className="translate-btn" onClick={onToggleLang}>
                    {language === 'en' ? 'ES' : 'EN'}
                </button>
            </div>

            <div className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--active' : ''}`} onClick={() => setSidebarOpen(false)} />
            <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar__top">
                    <button className="theme-switch" onClick={onToggleLight} aria-label="Toggle theme">
                        <svg className="theme-switch__moon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        <span className={`theme-switch__thumb ${lightMode ? 'theme-switch__thumb--light' : ''}`} />
                        <svg className="theme-switch__sun" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    </button>
                    <button className="sidebar__translate" onClick={onToggleLang}>
                        {language === 'en' ? 'ES' : 'EN'}
                    </button>
                    <button className="sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 -960 960 960" fill={lightMode ? '#333' : '#fff'}>
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>
                </div>
                <p className="sidebar__title">{t.sidebarTitle}</p>
                {navItems.map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)}>{t[item.labelKey]}</button>
                ))}
            </aside>
        </>
    )
}

export default Navbar
