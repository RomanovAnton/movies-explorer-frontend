import React from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";
import "./Register.css";

export default function Register({ handleRegister }) {
  return (
    <>
      <Header type={"form"} />
      <main>
        <Form type={"register"} handleRegister={handleRegister} error={true} />
      </main>
    </>
  );
}
