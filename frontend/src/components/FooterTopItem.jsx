import React from 'react';

const contactIcons = {
  store: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1",
  email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z m18 2l-8 5-8-5",
  whatsapp: "M21 15.46l-5.27-.61-2.52 2.52c-2.83-1.44-5.15-3.75-6.59-6.59l2.53-2.52L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  chat: { 
    paths: [
      "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
      "M8 10h8M8 14h4"
    ]
  }
};

const FooterTopItem = ({ icon, text, className = "footer-top-item" }) => {
  const iconData = contactIcons[icon];
  
  return (
    <div className={className}>
      <svg className="footer-top-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {Array.isArray(iconData?.paths) ? (
          iconData.paths.map((path, index) => 
            iconData.isPolyline ? 
              <polyline key={index} points={path} /> : 
              <path key={index} d={path} />
          )
        ) : (
          <path d={iconData} />
        )}
      </svg>
      {text}
    </div>
  );
};

export default FooterTopItem;
