import React from 'react';
import authorImage from '../../images/about/author-about.jpg';
import './About.css';

export default function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="author" className="about__image" />
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          I am Sahar Moshe, a passionate software developer with expertise in
          front-end technologies like HTML, CSS, JavaScript, and React. as well
          as back-end development using Node.js and database management with
          MongoDB and SQL. I have been passionate about programming since a
          young age, and after completing a boot camp at Practicum, I am eager
          to turn my hobby into a career. As a developer, I am committed to
          continuous learning and growth and enjoy collaborating with other
          professionals to expand my knowledge and skills. I am driven by the
          satisfaction of developing innovative solutions that can positively
          impact people&apos;s lives. Check out my GitHub profile to see some of the
          projects I have worked on.
        </p>
      </div>
    </section>
  );
}
