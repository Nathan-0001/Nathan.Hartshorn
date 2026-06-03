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
    const linksRef = useRef(null)
    const t = translations[language].nav

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setSidebarOpen(false)
    }

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
                <ul className="navbar__links" ref={linksRef}>
                    <div className="navbar__indicator" style={{ transform: `translateX(${indicatorStyle.left}px)`, width: indicatorStyle.width }} />
                    {navItems.map((item, i) => (
                        <li key={item.id}>
                            <button
                                className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                                onClick={() => scrollTo(item.id)}
                            >
                                {t[item.labelKey]}
                            </button>
                        </li>
                    ))}
                </ul>
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
                    <button className="sidebar__theme-toggle" onClick={onToggleLight} aria-label="Toggle theme">
                        <span className={`theme-switch ${lightMode ? 'theme-switch--light' : ''}`}>
                            <span className={`theme-switch__thumb ${lightMode ? 'theme-switch__thumb--light' : ''}`} />
                        </span>
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
