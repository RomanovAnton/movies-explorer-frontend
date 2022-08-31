import React, { useState } from "react";

export default function useValidation(evt) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const checkErrors = (evt) => {
    if (!evt.target.checkValidity()) {
      if (evt.target.validity.patternMismatch && evt.target.name === "name") {
        setErrorMessage((prev) => ({
          ...prev,
          [evt.target.name]:
            "поле должно содержать только латиницу, кириллицу, пробел или дефис",
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          [evt.target.name]: evt.target.validationMessage,
        }));
      }
    } else {
      setErrorMessage({});
      setFormIsValid(true);
    }
  };
  return {
    errorMessage,
    setErrorMessage,
    formIsValid,
    setFormIsValid,
    checkErrors,
  };
}
