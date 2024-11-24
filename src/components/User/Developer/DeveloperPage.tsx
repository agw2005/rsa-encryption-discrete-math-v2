import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DeveloperPage.css';
import usersData from '../../../data/users.json';

interface User {
  id: number;
  name: string;
  role: string;
  profilePic: string;
  password: string;
}

const DeveloperPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('send'); // Default to 'send'

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const user = usersData.find((user) => user.id === parseInt(userId));
      setCurrentUser(user || null);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };



  if (!currentUser) {
    return <div>Loading...</div>;
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

      <section className="userOne-s-o-container">
      <div className="userOne-send-received">
        <div
          id="send-option"
          className={activeSection === 'send' ? 'active' : ''}
          onClick={() => setActiveSection('send')}
        >
          Send
        </div>
        <div
          id="receive-option"
          className={activeSection === 'inbox' ? 'active' : ''}
          onClick={() => setActiveSection('inbox')}
        >
          Inbox
        </div>
      </div>

      <div className="userOne-outer-body">
        {activeSection === 'send' && (
          <div id="send" className="userOne-inner-body">
            <div className="userOne-form-section">
              <form>
                <div className="dropdown-container">
                  <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
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
                  </div>

                  {isOpen && (
                    <div className="dropdown-menu">
                      {usersData.map((user) => (
                        <div
                          key={user.id}
                          className="dropdown-item"
                          onClick={() => handleUserSelect(user)}
                        >
                          <img src={user.profilePic} alt={user.name} className="profile-image" />
                          <div className="user-info">
                            <p className="user-name">{user.name}</p>
                            <p className="user-role">{user.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="message-subject"
                  id="message-subject"
                  placeholder="Message subject..."
                />
                <textarea
                  cols={7}
                  name="message-content"
                  id="message-content"
                  placeholder="What message do you want to send?"
                ></textarea>
              </form>

              <div className="userOne-send-section">
                <p>Message sent will be encrypted</p>
                <img src="/send.png" alt="" />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'inbox' && (
          <div id="inbox" className="userOne-inner-body">
            <p>Inbox content goes here...</p>
          </div>
        )}
      </div>
    </section>
    </div>
  );
};

export default DeveloperPage;
