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
      </div>
    </header>
  );
};

export default Header;
