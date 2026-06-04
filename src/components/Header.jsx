import { useState, useEffect } from "react";
import translations from "../translations";
import "./Header.css";

const Header = ({ language }) => {
  const t = translations[language].header;
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setWordIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const words = t.typing;
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, t.typing]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="home" className="header">
      <div className="header__content">
        <span className="availability-badge">
          <span className="availability-dot" />
          {t.available}
        </span>
        <h2 className="header__name">{t.greeting}</h2>
        <h1 className="header__role">{t.role}</h1>
        <h3 className="header__typing">
          {text}<span className="cursor">|</span>
        </h3>
        <p className="header__desc">{t.desc}</p>
        <div className="header__actions">
          <button className="header__btn header__btn--contact" onClick={() => scrollTo('contact')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {t.contactBtn}
          </button>
          <button className="header__btn header__btn--projects" onClick={() => scrollTo('projects')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
            {t.projectsBtn}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
