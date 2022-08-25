import React from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";

export default function Login({ onLogin }) {
  return (
    <>
      <Header type={"form"} />
      <main>
        <Form type={"login"} onLogin={onLogin} />
      </main>
    </>
  );
}
