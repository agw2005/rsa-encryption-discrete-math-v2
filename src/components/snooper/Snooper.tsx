import { useState } from "react";
import "./Snooper.css";

const Snooper = () => {
  let contentMessage =
    "“individual tasked with monitoring, inspecting, or analyzing data or communication traffic within a network or system.”";
  let contentSender = "gpt 4o";
  let name = "Snooper";
  let [encryptedOn, setEncryptedOn] = useState(true);
  let [navVisible, setNavVisible] = useState(false);
  let handleClickEncrypted = () => {
    setEncryptedOn(!encryptedOn);
  };
  let handleClickNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      <header>
        <div className="snooper-left-header">
          <img
            onClick={handleClickNav}
            className="snooper-left-header-nav"
            src="/nav.png"
            alt="nav-button"
          />
          <a href="/">
            <img src="/picraft-logo.png" alt="logo" />
          </a>
        </div>

        <img
          onClick={handleClickEncrypted}
          className="snooper-right-header"
          src={`toggle-encrypted-${encryptedOn ? "on" : "off"}.png`}
          alt="encrypt-toggle"
        />
      </header>

      <nav
        className={navVisible ? "snooper-nav-available" : "snooper-nav-hidden"}
      >
        <div className="snooper-left-header-sidebar">
          <img
            onClick={handleClickNav}
            className="snooper-left-header-nav-sidebar"
            src="/nav.png"
            alt="nav-button"
          />
          <a href="/">
            <img src="/picraft-logo.png" alt="logo" />
          </a>
        </div>
        <img
          src="/profile-bar.png"
          alt="Analystic SMPT"
          className="snooper-analystic"
        />
        <hr />
        <p>Analytics</p>
        <ul>
          <li>About SMTP</li>
          <li>About Encryption</li>
          <li>Management Emails</li>
          <li>Create Work</li>
          <li>Account Settings</li>
        </ul>
        <hr />
        <a href="/user_one">
          <p>User 1</p>
        </a>
        <ul>
          <li>Send</li>
          <li>Inbox</li>
        </ul>
        <p>User 2</p>
        <ul>
          <li>Send</li>
          <li>Inbox</li>
        </ul>
        <a href="/snooper">
          <p>Snooper</p>
        </a>
        <ul>
          <li>Monitor 1</li>
          <li>Recently Traffic</li>
        </ul>
        <section className="snooper-nav-footer">
          <hr />
          <ul>
            <li>About Me</li>
            <li>Help Me</li>
          </ul>
        </section>
      </nav>

      <section className="snooper-message-section">
        <div className="snooper-message-toggle">
          <p>{name}</p>
        </div>
        <div className="snooper-content-body">
          <img
            className="snooper-profile-pic"
            src="/snooper.png"
            alt="profile-pic"
          />
          <div className="snooper-content-text">
            <p>{contentMessage}</p>
            <p>– {contentSender}</p>
          </div>
        </div>
      </section>

      <section className="snooper-s-o-container">
        <div className="snooper-traffics">
          <div id="traffic-one">Traffic 1</div>
          <div id="traffic-two">Traffic 2</div>
        </div>
        <div className="snooper-outer-body">
          <div className="snooper-inner-body">
            <div className="snooper-content-container">
              <div className="snooper-snooper-infos">
                <img src="RunWTheWolf.png" alt="snooper-picture" />
                <div className="snooper-snooper-name-info">
                  <img src="RunWTheWolf-profile.png" alt="snooper-profile" />
                  <p>RunWTheWolves</p>
                </div>
              </div>
              <div className="snooper-snooper-message">
                <p className="snooper-message-title">bank account report</p>
                <p className="snooper-message-content">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quibusdam id ea labore! Aliquid, error porro? Eius doloribus
                  possimus nam quas atque voluptatum necessitatibus corrupti id
                  corporis. Ut quos est nisi.Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Quibusdam id ea labore! Aliquid,
                  error porro? Eius doloribus possimus nam quas atque voluptatum
                  necessitatibus corrupti id corporis. Ut quos est nisi.Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
                  id ea labore! Aliquid, error porro? Eius doloribus possimus
                  nam quas atque voluptatum necessitatibus corrupti id corporis.
                  Ut quos est nisi.Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Snooper;
