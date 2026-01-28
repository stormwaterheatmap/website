// src/components/ExternalLink.jsx
import React from 'react';
import styles from './ExternalLink.module.css'; // Import the CSS module

const ExternalLinkIcon = () => (
  <svg
    width="13.5"
    height="13.5"
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={styles.icon} // Use the CSS module class
  >
    <path
      fill="currentColor"
      d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
    ></path>
  </svg>
);

export default function ExternalLink({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link} // Use the CSS module class
    >
      <span>{children}</span>
      <ExternalLinkIcon />
    </a>
  );
}