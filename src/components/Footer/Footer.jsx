import React from 'react';
import './Footer.css';
import facebookIcon from '../../images/icons/logos/facebook.svg';
import githubIcon from '../../images/icons/logos/github.svg';

export default function App() {
  return (
    <footer className="footer">
      <p className="footer__copyrights">
        © 2021 Supersite, Powered by News API
      </p>

      <nav>
        <ul className="footer__nav-list">
          <li className="footer__nav-item footer__nav-item_type_home">
            <a className="footer__nav-link" href="/">
              Home
            </a>
          </li>
          <li className="footer__nav-item footer__nav-item_type_practicum">
            <a className="footer__nav-link" href="https://practicum.com">
              Practicum
            </a>
          </li>

          <li className="footer__nav-item_type_github">
            <a href="https://github.com">
              <img
                className="footer__nav-icon"
                src={githubIcon}
                alt="github link"
              />
            </a>
          </li>
          <li className="footer__nav-item footer__nav-item_type_facebook">
            <a href="https://facebook.com">
              <img
                className="footer__nav-icon"
                src={facebookIcon}
                alt="Facebook link"
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
//  <button type="button" className="button button-bookmark button-bookmark_state_marked"></button>
