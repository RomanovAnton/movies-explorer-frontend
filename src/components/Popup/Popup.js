import React from "react";
import "./Popup.css";

export default function Popup({ isOpen, message, closePopup }) {
  return (
    <div className={`popup ${isOpen ? "popup__opened" : ""}`}>
      <div className="popup__container">
        <p className="popup__message">{message}</p>
        <div className="popup__close" onClick={closePopup}>
          ⮿
        </div>
      </div>
    </div>
  );
}
