import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Nathan Hartshorn. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
