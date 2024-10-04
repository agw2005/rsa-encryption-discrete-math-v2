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

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Scroll Test</p>
    </>
  );
};

export default UserOne;
