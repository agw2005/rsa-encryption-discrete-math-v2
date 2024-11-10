import React from "react";
import { useState } from "react";
import "./Sandbox.css";

const Sandbox = () => {
  let [encryptedOn, setEncryptedOn] = useState(true);
  let handleClickEncrypted = () => {
    setEncryptedOn(!encryptedOn);
  };

  return (
    <>
      <header>
        <div className="left-header">
          <img className="left-header-nav" src="/nav.png" alt="nav-button" />
          <img src="/picraft-logo.png" alt="logo" />
        </div>

        <img
          onClick={handleClickEncrypted}
          className="right-header"
          src={`toggle-encrypted-${encryptedOn ? "on" : "off"}.png`}
          alt="encrypt-toggle"
        />
      </header>
    </>
  );
};

export default Sandbox;
