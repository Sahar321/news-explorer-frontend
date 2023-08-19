/*eslint-disable*/
import React, { useEffect } from 'react';
import './SocialShareButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faClipboard,
  faSms,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebookSquare,
  faWhatsappSquare,
  faTelegram,
  faTwitterSquare,
  faPinterestSquare,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const SocialShareButton = ({ link }) => {
  const encodedLink = encodeURIComponent(link);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedLink}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedLink}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedLink}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodedLink}`;
  const emailUrl = `mailto:?subject=newsExplorer&body=${encodedLink}`;
  const handleClipboardClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log('Copied the text: ' + link);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    } else {
      // Fallback for browsers that don't support clipboard API
      document.execCommand('copy');

      console.log('execCommand: Copied the text: ' + link);
    }
  };

  return (
    <div className="share-popup">
      <h4 className="share-popup__title">Let the world know!</h4>

      <ul className="social-button__list">
        <li className="social-button__item">
          <i
            className="regular social-button__link"
            onClick={handleClipboardClick}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faClipboard} />
          </i>
        </li>
        <li className="social-button__item">
          <i className="regular social-button__link" >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>

            <FontAwesomeIcon icon={faEnvelope} />
          </i>
        </li>

        <li className="social-button__item">
          <a
            target="_blank"
            className="facebook social-button__link"
            href={facebookUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
        </li>
        <li className="social-button__item">
          <a
            target="_blank"
            className="whatsapp social-button__link"
            href={whatsappUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faWhatsappSquare} />
          </a>
        </li>
        <li className="social-button__item">
          <a
            target="_blank"
            className="telegram social-button__link"
            href={telegramUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </li>
        <li className="social-button__item">
          <a
            target="_blank"
            className="twitter social-button__link"
            href={twitterUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
        </li>
        <li className="social-button__item">
          <a
            target="_blank"
            className="pinterest social-button__link"
            href={pinterestUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faPinterestSquare} />
          </a>
        </li>
        <li className="social-button__item">
          <a
            target="_blank"
            className="linkedin social-button__link"
            href={linkedinUrl}
          >
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <span className="social-button__span"></span>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SocialShareButton;
