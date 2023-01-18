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
          Hello, my name is Sahar Moshe.<br/>An amateur programmer since the age of
          12.
          <br />
          Now after bootcamp at a practicum, looking to turn the hobby into the
          profession I&apos;ve always dreamed of.
          <br /> <br />
          <strong>The technologies I used for the project:</strong>
          <br />
          HTML & CSS
          <br />
          javaScript & React
          <br />
          node.js (express)
          <br />
          mongoDB
          <br />
          <br />
          For more projects that i created, look on my <strong>github profile</strong> (down
          blow)
        </p>
      </div>
    </section>
  );
}
