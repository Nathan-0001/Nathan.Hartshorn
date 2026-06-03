import ibmImg from '../assets/ibmcertificate.png'
import iaImg from '../assets/desarrollocert.jpg'
import translations from '../translations'
import './Certifications.css'

const certifications = [
  {
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'Coursera / IBM',
    date: 'May 14, 2026',
    asset: ibmImg,
    isPdf: false
  },
  {
    title: 'Certificado De Iniciación Al Desarrollo Con IA',
    issuer: 'MoureDev & BigSchool',
    date: '13/3/2026',
    asset: iaImg,
    isPdf: false
  }
]

const Certifications = ({ language }) => {
  const t = translations[language].certifications

  return (
    <section id="certifications" className="certifications section-fade">
      <div className="certifications__container">
        <h2 className="section-title">{t.title}</h2>
        <div className="certifications__scroller">
          {certifications.map((cert, i) => (
            <a
              key={i}
              href={cert.asset}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
            >
              <div className="cert-card__visual">
                <img
                  src={cert.asset}
                  alt={cert.title}
                  className="cert-card__img"
                />
              </div>
              <div className="cert-card__info">
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__meta">
                  {cert.issuer} &middot; {cert.date}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications
