import { useState } from "react";
import "./Sandbox.css";

const Sandbox = () => {
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
        <div className="left-header">
          <img
            onClick={handleClickNav}
            className="left-header-nav"
            src="/nav.png"
            alt="nav-button"
          />
          <img src="/picraft-logo.png" alt="logo" />
        </div>

        <img
          onClick={handleClickEncrypted}
          className="right-header"
          src={`toggle-encrypted-${encryptedOn ? "on" : "off"}.png`}
          alt="encrypt-toggle"
        />
      </header>

      <nav className={navVisible ? "nav-available" : "nav-hidden"}>
        <div className="left-header-sidebar">
          <img
            onClick={handleClickNav}
            className="left-header-nav-sidebar"
            src="/nav.png"
            alt="nav-button"
          />
          <img src="/picraft-logo.png" alt="logo" />
        </div>
        <img
          src="/profile-bar.png"
          alt="Analystic SMPT"
          className="analystic"
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
        <p>User 1</p>
        <ul>
          <li>Send</li>
          <li>Inbox</li>
        </ul>
        <p>User 2</p>
        <ul>
          <li>Send</li>
          <li>Inbox</li>
        </ul>
        <p>Snooper</p>
        <ul>
          <li>Monitor 1</li>
          <li>Recently Traffic</li>
        </ul>
        <section className="nav-footer">
          <hr />
          <ul>
            <li>About Me</li>
            <li>Help Me</li>
          </ul>
        </section>
      </nav>

      <section className="message-section">
        <div className="message-toggle">
          <p>{name}</p>
        </div>
        <div className="content-body">
          <img className="profile-pic" src="/snooper.png" alt="profile-pic" />
          <div className="content-text">
            <p>{contentMessage}</p>
            <p>– {contentSender}</p>
          </div>
        </div>
      </section>

      <section className="s-o-container">
        <div className="traffics">
          <div id="traffic-one">Traffic 1</div>
          <div id="traffic-two">Traffic 2</div>
        </div>
        <div className="outer-body">
          <div className="inner-body">
            <div className="content-container">
              <div className="snooper-infos">
                <img src="RunWTheWolf.png" alt="snooper-picture" />
                <div className="snooper-name-info">
                  <img src="RunWTheWolf-profile.png" alt="snooper-profile" />
                  <p>RunWTheWolves</p>
                </div>
              </div>
              <div className="snooper-message">
                <p className="message-title">bank account report</p>
                <p className="message-content">
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

export default Sandbox;
