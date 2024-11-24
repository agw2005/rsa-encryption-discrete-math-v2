// src/components/TrafficCard.tsx
import React from 'react';

interface TrafficCardProps {
  title: string;
  imageUrl: string;
  profileImageUrl: string;
  profileName: string;
  profileName2: string;
}

const TrafficCard: React.FC<TrafficCardProps> = ({
  title,
  imageUrl,
  profileImageUrl,
  profileName,
  profileName2,
}) => {
  return (
    <div className="traffic-card">
      <div className="traffic-card-title">{title}</div>
      <div className="traffic-card-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="traffic-card-profile">
        <img src={profileImageUrl} alt={profileName} />
        <span className="traffic-card-profile-name">
          {profileName}
          <br />
          {profileName2}
        </span>
      </div>
      <div className="placeholder-container">
        <div className="placeholder-background" />
      </div>
    </div>
  );
};

const TrafficAnalyzer: React.FC = () => {
  const trafficCards = [
    {
      title: "",
      imageUrl: "placeholder-image.jpg",
      profileImageUrl: "profile-image.jpg",
      profileName: "RunWTheWolves",
      profileName2: "ves",
    },
    {
      title: "",
      imageUrl: "placeholder-image.jpg",
      profileImageUrl: "profile-image.jpg",
      profileName: "RunWTheWolves",
      profileName2: "ves",  
    },
    {
      title: "",
      imageUrl: "placeholder-image.jpg",
      profileImageUrl: "profile-image.jpg",
      profileName: "RunWTheWolves",
      profileName2: "ves",
    }
  ];

  return (
    <div className="analyzer-container">
      <div className="content-wrapper">
        {/* Header Section */}
        <header className="analyzer-header">
          <div className="header-left">
            <div className="hamburger-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="picraft-menu">
              <img src="picraft.jpg" alt="Picraft" />
            </div>
          </div>
          <div className="encrypted-badge"></div>
        </header>

        {/* Encrypt Box Section */}
        <div className="encrypt-box">
          <div className="encrypt-box-title">Encrypt</div>
          <p>"individual tasked with monitoring, inspecting, or analyzing data or communication traffic within a network or system"
            <br/>- gpt 40
          </p>
        </div>

        {/* Traffic Sections */}
        <div className="traffic-sections">
          <div className="traffic-section">
            <div className="traffic-titles">
              <h2 className="traffic-title">Traffic 1</h2>
              <h2 className="traffic-title traffic-title-2">Traffic 2</h2>
            </div>
            <div className="traffic-cards-wrapper">
              <div className="traffic-cards-container">
                {trafficCards.map((card, index) => (
                  <TrafficCard key={index} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TrafficCard, TrafficAnalyzer };
export default TrafficAnalyzer;