import nathanPic from "../assets/nathan.png";
import "./Hero.css";

const Hero = () => {
  return (
    <header id="home" className="hero">
      <div className="hero__content">
        <div className="hero__main">
          <div className="hero__photo">
            <img src={nathanPic} alt="Nathan" />
          </div>
          <div className="hero__text">
            <h1 className="hero__name">Nathan Hartshorn</h1>
            <h2 className="hero__title">Full-Stack Developer</h2>
            <p className="hero__description">
              I'm an ex-mechanic with a thing for building stuff with code. I fell
              into coding out of pure curiosity and never really looked back.
              There's something satisfying about starting with nothing and ending
              up with something that works. Outside of development I'm interested
              in where AI is heading, which is partly why I've been diving deeper
              into that space lately. I like clean work, interesting problems, and
              figuring things out as I go.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
