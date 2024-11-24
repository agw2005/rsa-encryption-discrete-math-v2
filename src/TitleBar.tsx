// TitleBar.tsx
import React from 'react';

const TitleBar: React.FC = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-left">
        <img src="/icons/menu.svg" alt="Menu" className="title-bar-icon" />
        <span className="title-bar-text">PICRAFT</span>
      </div>
      <div className="encrypted-status">
        <span className="lock-icon">🔒</span>
        <span>ENCRYPTED OFF</span>
      </div>
    </div>
  );
};

export default TitleBar;