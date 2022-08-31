import { useState } from "react";

export default function usePopup() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const closePopup = () => {
    setPopupIsOpen(false);
    setPopupMessage("");
  };

  const openPopup = (message) => {
    setPopupMessage(message);
    setPopupIsOpen(true);
  };

  return { popupIsOpen, setPopupIsOpen, closePopup, openPopup, popupMessage };
}
