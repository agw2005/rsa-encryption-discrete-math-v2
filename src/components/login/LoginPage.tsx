import React, { useState, useEffect } from 'react';
import { ChevronDown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


import usersData from '../../data/users.json';

interface User {
  id: number;
  name: string;
  role: string;
  profilePic: string;
  password: string;

}

const LoginPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To navigate after successful login

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleLogin = () => {
    if (!selectedUser) return;

    if (password === selectedUser.password) {
      console.log('Login successful:', selectedUser);

      // Navigate based on role
      switch (selectedUser.role) {
        case 'Product Manager':
          navigate('/product_manager');
          break;
        case 'Senior Developer':
          navigate('/senior_developer');
          break;
        case 'Junior Developer':
          navigate('/junior_developer');
          break;
        default:
          navigate('/');
      }
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img 
            src="/picraft-logo.png" 
            alt="logo" 
            className="logo"
          />
        </div>
      </header>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          {/* User Selection Dropdown */}
          <div className="dropdown-container">
            <div 
              className="dropdown-trigger"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedUser ? (
                <div className="user-card">
                  <img 
                    src={selectedUser.profilePic} 
                    alt={selectedUser.name}
                    className="profile-image"
                  />
                  <div className="user-info">
                    <p className="user-name">{selectedUser.name}</p>
                    <p className="user-role">{selectedUser.role}</p>
                  </div>
                </div>
              ) : (
                <span className="select-prompt">Select User</span>
              )}
              <ChevronDown className="dropdown-icon" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="dropdown-menu">
                {usersData.map(user => (
                  <div
                    key={user.id}
                    className="dropdown-item"
                    onClick={() => handleUserSelect(user)}
                  >
                    <img 
                      src={user.profilePic} 
                      alt={user.name}
                      className="profile-image"
                    />
                    <div className="user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password Input - Only shown when user is selected and dropdown is closed */}
          {selectedUser && !isOpen && (
            <div className="password-container">
              <div className="password-input-wrapper">
                <Lock className="password-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="password-input"
                />
              </div>
              <button 
                className="login-button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;