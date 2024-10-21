import { SyntheticEvent, useState } from "react";
import "./userOne.css";

const UserOne = () => {
  let contentMessage =
    "“YOU HAVE SO MUCH BUT ARE ALWAYS HUNGRY FOR MORE. STOP LOOKING UP AT EVERYTHING YOU DON'T HAVE AND LOOK AROUND AT EVERYTHING YOU DO.“";
  let contentSender = "Rupi Kaur";
  let name = "Kurt Cobain";
  let pubkey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvPqYT5z5tcVYzVCJw+Is";
  let privkey =
    "FP/KY+UNchKq4O0ufWoP4YZUVjq3/NyckJMeo8iV5wwPxtmXfbLWUVfdKKftFrjd";
  let [currentMessage, setCurrentMessage] = useState(contentMessage);
  let [navVisible, setNavVisible] = useState(false);
  let [encryptedOn, setEncryptedOn] = useState(true);

  let handleClickKeys = (event: SyntheticEvent) => {
    let clickedElement = event.currentTarget as HTMLElement;
    let clickedElementClass = clickedElement.className;
    if (clickedElementClass.includes("message-toggle")) {
      setCurrentMessage(contentMessage);
    } else if (clickedElementClass.includes("pub-key")) {
      setCurrentMessage(pubkey);
    } else if (clickedElementClass.includes("priv-key")) {
      setCurrentMessage(privkey);
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
          alt="encrypt-on"
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
        <div onClick={handleClickKeys} className="message-toggle">
          <p>{name}</p>
        </div>
        <div className="content-body">
          <img className="profile-pic" src="/kurner.png" alt="profile-pic" />
          <div className="content-text">
            <p>{currentMessage}</p>
            {currentMessage == contentMessage ? <p>– {contentSender}</p> : null}
          </div>
        </div>
        <div className="keys">
          <div onClick={handleClickKeys} className="pub-key">
            <p>public-key</p>
          </div>
          <div onClick={handleClickKeys} className="priv-key">
            <p>private-key</p>
          </div>
        </div>
      </section>
      <div className="s-o-container">
        <div className="send-received">
          <div id="send-option">Send</div>
          <div id="receive-option">Received</div>
        </div>
        <div className="outer-body">
          <div className="inner-body">
            <div className="form-section">
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
              <div className="send-section">
                <p>message sent will be encrypted</p>
                <img src="/send.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="whitespace"></div>
    </>
  );
};

export default UserOne;
