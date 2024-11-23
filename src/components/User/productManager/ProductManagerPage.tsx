import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProductManagerPage.css';
import usersData from '../../../data/users.json';

interface User {
  id: number;
  name: string;
  role: string;
  profilePic: string;
  password: string;
}

const ProductManagerPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user ID from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Find the user in the usersData based on the stored ID
      const user = usersData.find((user) => user.id === parseInt(userId));
      setCurrentUser(user || null); // Set the user data
    } else {
      // Redirect to login page if no user ID is found
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and navigate to the login page
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (!currentUser) {
    return <div>Loading...</div>; // Loading state if the user is not yet fetched
  }

  return (
    <div className="login-page">
      <header className="header">
        <div className="header-content">
          <img src="/picraft-logo.png" alt="logo" className="logo" />
        </div>
        <button onClick={handleLogout} className="logout-button" aria-label="Logout">
          <LogOut className="logout-icon" />
        </button>
      </header>

      <section className="snooper-message-section">
        <div className="snooper-message-toggle">
          <p>{currentUser.name}</p>
        </div>
        <div className="snooper-content-body">
          <img className="snooper-profile-pic" src={currentUser.profilePic} alt="profile-pic" />
          <div className="snooper-content-text">
            <p>{currentUser.role}</p>
            <p>– System</p>
          </div>
        </div>
      </section>

      <section className="snooper-s-o-container">
        <div className="snooper-traffics">
          <div id="traffic-two">Network Graph</div>
          <div id="traffic-one">Traffic log</div>
          <div id="traffic-two">Manage</div>
        </div>
        <div className="snooper-outer-body">
          {/* Add any specific content for Product Manager page */}
        </div>
      </section>
    </div>
  );
};

export default ProductManagerPage;
