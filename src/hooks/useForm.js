import { useState } from "react";

export default function useForm() {
  const [formParams, setFormParams] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChangeValue = (evt) => {
    const { name, value } = evt.target;
    setFormParams({ ...formParams, [name]: value });
    checkValue(evt);
  };

  const checkValue = (evt) => {
    if (!evt.target.validity.valid) {
      setErrorMessage({
        ...errorMessage,
        [evt.target.name]: evt.target.validationMessage,
      });
      setFormIsValid(false);
    } else {
      setErrorMessage({ ...errorMessage, [evt.target.name]: "" });
    }

    const form = evt.target.closest("form");
    if (form.checkValidity()) {
      setFormIsValid(true);
    }
  };

  const checkDataIsChanged = (currentUser) => {
    if (
      currentUser.name === formParams.name &&
      currentUser.email === formParams.email
    ) {
      setFormIsValid(false);
    }
  };

  return {
    formParams,
    setFormParams,
    errorMessage,
    setErrorMessage,
    formIsValid,
    setFormIsValid,
    handleChangeValue,
    checkDataIsChanged,
  };
}
