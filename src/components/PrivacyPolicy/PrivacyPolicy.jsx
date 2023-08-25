/*eslint-disable*/
import React from 'react';
import './PrivacyPolicy.css';
export default function PrivacyPolicy(props) {
  const text = 'Privacy Policy';

  return (
    <span className="PrivacyPolicy">
      This project serves as my culminating assignment for my full-stack
      studies. It's strictly a demonstration of my capabilities and is not
      intended for commercial or advertising purposes. It's likely to be
      decommissioned soon.
      <br />{' '}
      <strong>
        For users logging in through platforms like Google and Facebook:
      </strong>
      <br />
      *Only your email address is stored on our server to establish a user
      profile.
      <br /> * No other personal details are retained or used beyond website
      functionality.
      <br /> *To remove your email from our server, please reach out to
      Saharm123456@gmail.com.
    </span>
  );
}
