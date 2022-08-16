import React from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";
import "./Login.css";

export default function Login() {
  return (
    <>
      <Header type={"form"} />
      <main>
        <Form type={"login"} />
      </main>
    </>
  );
}
