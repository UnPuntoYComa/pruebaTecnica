import React from 'react';

const FooterSection = ({ 
  title, 
  sectionKey, 
  links, 
  isOpen, 
  onToggle,
  className = "footer-section" 
}) => {
  return (
    <div className={className}>
      <button 
        onClick={() => onToggle(sectionKey)}
        className="footer-section-header"
      >
        <h3 className="footer-section-title">{title}</h3>
        <svg 
          className={`footer-accordion-icon ${isOpen ? 'open' : ''}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <ul className={`footer-section-list ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href || "#"} className="footer-section-link">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
