import translations from '../translations'
import './Footer.css'

const Footer = ({ language }) => {
  const t = translations[language].footer

  return (
    <footer className="footer">
      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Nathan Hartshorn. {t.rights}</p>
      </div>
    </footer>
  )
}

export default Footer
