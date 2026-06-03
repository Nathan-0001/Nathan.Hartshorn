import './GitHub.css'

const GitHub = () => {
  return (
    <section id="github" className="github section-fade">
      <div className="github__container">
        <h2 className="section-title">GitHub Activity</h2>
        <div className="github__chart">
          <img
            src="https://ghchart.rshah.org/Nathan-0001"
            alt="GitHub contribution graph"
            className="github__img"
            loading="lazy"
          />
        </div>
        <p className="github__desc">My recent contributions on GitHub</p>
      </div>
    </section>
  )
}

export default GitHub
