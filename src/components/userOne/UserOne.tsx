import { SyntheticEvent, useState } from "react";
import generateKeys from "../../functions/generateKeys";
import encryptString from "../../functions/encryptString";
import "src/components/serOne/UserOne.css";

const UserOne = () => {
  const { publicKey, privateKey } = generateKeys();
  let contentMessage =
    "“YOU HAVE SO MUCH BUT ARE ALWAYS HUNGRY FOR MORE. STOP LOOKING UP AT EVERYTHING YOU DON'T HAVE AND LOOK AROUND AT EVERYTHING YOU DO.“";
  let encryptedContentMessage = encryptString(contentMessage, publicKey);
  let contentSender = "Rupi Kaur";
  let name = "Kurt Cobain";
  let [currentMessage, setCurrentMessage] = useState(contentMessage);
  let [navVisible, setNavVisible] = useState(false);
  let [encryptedOn, setEncryptedOn] = useState(true);

  let handleClickKeys = (event: SyntheticEvent) => {
    let clickedElement = event.currentTarget as HTMLElement;
    let clickedElementClass = clickedElement.className;
    if (clickedElementClass.includes("message-toggle") && encryptedOn) {
      setCurrentMessage(String(encryptedContentMessage));
    } else if (clickedElementClass.includes("message-toggle") && !encryptedOn) {
      setCurrentMessage(contentMessage);
    } else if (clickedElementClass.includes("pub-key")) {
      setCurrentMessage(String(publicKey.publicExponent));
    } else if (clickedElementClass.includes("priv-key")) {
      setCurrentMessage(String(privateKey.privateExponent));
    }
  };

  let handleClickNav = () => {
    setNavVisible(!navVisible);
  };

  let handleClickEncrypted = () => {
    setEncryptedOn(!encryptedOn);
  };

  return (
    <>
      <header>
        <div className="userOne-left-header">
          <img
            onClick={handleClickNav}
            className="userOne-left-header-nav"
            src="/nav.png"
            alt="nav-button"
          />
          <a href="/">
            <img src="/picraft-logo.png" alt="logo" />
          </a>
        </div>

        <img
          onClick={handleClickEncrypted}
          className="userOne-right-header"
          src={`toggle-encrypted-${encryptedOn ? "on" : "off"}.png`}
          alt="encrypt-toggle"
        />
      </header>

      <nav
        className={navVisible ? "userOne-nav-available" : "userOne-nav-hidden"}
      >
        <div className="userOne-left-header-sidebar">
          <img
            onClick={handleClickNav}
            className="userOne-left-header-nav-sidebar"
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
          className="userOne-analystic"
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
        <section className="userOne-nav-footer">
          <hr />
          <ul>
            <li>About Me</li>
            <li>Help Me</li>
          </ul>
        </section>
      </nav>

      <section className="userOne-message-section">
        <div onClick={handleClickKeys} className="userOne-message-toggle">
          <p>{name}</p>
        </div>
        <div className="userOne-content-body">
          <img
            className="userOne-profile-pic"
            src="/kurner.png"
            alt="profile-pic"
          />
          <div className="userOne-content-text">
            <p>{currentMessage}</p>
            {currentMessage == contentMessage ? <p>– {contentSender}</p> : null}
          </div>
        </div>
        <div className="userOne-keys">
          <div onClick={handleClickKeys} className="userOne-pub-key">
            <p>public-key</p>
          </div>
          <div onClick={handleClickKeys} className="userOne-priv-key">
            <p>private-key</p>
          </div>
        </div>
      </section>

      <section className="userOne-s-o-container">
        <div className="userOne-send-received">
          <div id="send-option">Send</div>
          <div id="receive-option">Received</div>
        </div>
        <div className="userOne-outer-body">
          <div className="userOne-inner-body">
            <div className="userOne-form-section">
              <form>
                <input
                  type="text"
                  name="deliver-to"
                  id="deliver-to"
                  placeholder="deliver to..."
                />
                <input
                  type="text"
                  name="message-subject"
                  id="message-subject"
                  placeholder="message subject..."
                />
                <textarea
                  cols={7}
                  name="message-content"
                  id="message-content"
                  placeholder="what message do you want to send?"
                ></textarea>
              </form>
              <div className="userOne-send-section">
                <p>message sent will be encrypted</p>
                <img src="/send.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserOne;
