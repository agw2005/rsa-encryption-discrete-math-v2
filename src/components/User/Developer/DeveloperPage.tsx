import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DeveloperPage.css';
import usersData from '../../../data/users.json';
import { accessGraph, accessgraph } from '../../../Data/accessGraph';
import { Mail } from 'lucide-react';


interface User {
  id: number;
  name: string;
  role: string;
  profilePic: string;
  password: string;
}

interface Message {
  id: number; // Add the 'id' property to uniquely identify each message
  from: number;
  to: number;
  subject: string;
  content: string;
  date: string; // Add the 'date' property to store when the message was sent
}

const DeveloperPage: React.FC = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [activeSection, setActiveSection] = useState("send");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const canAccess = (currentRole: string, targetRole: string, graph: accessgraph): boolean => {
    const accessibleRoles = graph[currentRole] || [];
    return accessibleRoles.includes(targetRole);
  };
  const navigate = useNavigate();


  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const user = usersData.find((user) => user.id === parseInt(userId));
      setCurrentUser(user || null);
      setUsers(usersData);
    } else {
      navigate("/login");
    }

    // Load messages from localStorage
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [navigate]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (!selectedUser || !subject || !content) {
      alert("Please fill in all fields and select a user!");
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1, // Generate a new unique ID
      from: currentUser?.id || 0,
      to: selectedUser.id,
      subject,
      content,
      date: new Date().toISOString(), // Set the current date/time in ISO format
    };

    // Add the new message to the state
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Save updated messages to localStorage
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    setSubject("");
    setContent("");
    alert("Message sent!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const inboxMessages = messages.filter((msg) => msg.to === currentUser?.id);


const handleMessageClick = (msg: Message) => {
  setSelectedMessage(msg);
};

const getSenderName = (userId: number): string => {
  const sender = users.find(user => user.id === userId);
  return sender ? sender.name : "Unknown";
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
          {activeSection === "send" && (
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
                        {usersData
                          .filter(
                            (user) =>
                              user.id !== currentUser?.id && // Exclude the current user
                              canAccess(currentUser.role, user.role, accessGraph) // Check access permissions
                          )
                          .map((user) => (
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

                  <input
                    type="text"
                    name="message-subject"
                    id="message-subject"
                    placeholder="Message subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <textarea
                    cols={7}
                    name="message-content"
                    id="message-content"
                    placeholder="What message do you want to send?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </form>

                <div className="userOne-send-section" onClick={handleSendMessage}>
                  <p>Message sent will be encrypted</p>
                  <img src="/send.png" alt="Send Icon" />
                </div>
              </div>
            </div>
          )}

{activeSection === "inbox" && (
  <div id="inbox" className="userOne-inner-body inbox-container">
    <div className="inbox-header">
      <h3>Inbox</h3>
    </div>
    {inboxMessages.length > 0 ? (
        <div className="inbox-content">
          <div className="inbox-message-list">
            {inboxMessages.map((msg) => (
              <div
                key={msg.id}
                className={`inbox-message-preview ${
                  selectedMessage?.id === msg.id ? 'selected' : ''
                }`}
                onClick={() => handleMessageClick(msg)}
              >
                <div className="message-info">
                  <div className="message-header">
                    <p className="message-from">{getSenderName(msg.from)}</p>
                    <span className="message-time">
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-subject">{msg.subject}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedMessage && (
            <div className="message-detail">
              <div className="message-detail-header">
                <h4>{selectedMessage.subject}</h4>
                <p className="message-from">
                  From: {getSenderName(selectedMessage.from)}
                </p>
              </div>
              <div className="message-detail-content">
                <p className="message-content">{selectedMessage.content}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-inbox">
          <div className="empty-inbox-icon">📬</div>
          <p>No messages in your inbox.</p>
        </div>
      )}
  </div>
)}
        </div>
      </section>
    </div>
  );
};

export default DeveloperPage;
