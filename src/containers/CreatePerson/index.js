/**
 * Create person
 */

import React, { useState } from "react";
import propTypes from "prop-types";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";

export default function CreatePerson() {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const isValid = () => {
    return (
      person.first_name != "" &&
      person.last_name != "" &&
      person.email != "" &&
      person.hourly_load != ""
    );
  };

  const handleSubmit = (e) => {
    setMsg("");
    e.preventDefault();
    if (!isValid(person)) {
      setError("Completar todos los campos para iniciar sesión");
    } else {
      axiosInstance
        .post("/people", {
          person: person,
        })
        .then((response) => {
          if (response.status == 200) {
            setMsg("Usuario creado correctamente");
            setError("");
          } else setError("Error inesperado");
        })
        .catch((error) => {
          console.log("error", error.response);
          if (
            error.response != undefined &&
            error.response.status != null &&
            error.response.status == 401
          )
            setError("Falta autentificarse !");
          else if (error.response.status == 400) {
            let errors = error.response.data.errors;
            setError(
              "Error, hay un problema con los datos ingresados - " +
                Object.keys(errors)[0] +
                " " +
                errors[Object.keys(errors)[0]]
            );
          } else
            setError(
              "Error inesperado al enviar formulario - " +
                Object.keys(errors)[0] +
                " " +
                errors[Object.keys(errors)[0]]
            );
        });
    }
  };
  const checkInput = (e) => {
    if (e.target.id == "first_name")
      setPerson({ ...person, first_name: e.target.value });
    else if (e.target.id == "last_name")
      setPerson({ ...person, last_name: e.target.value });
    else if (e.target.id == "email")
      setPerson({ ...person, email: e.target.value });
    else if (e.target.id == "working_hours") {
      setPerson({ ...person, working_hours: parseInt(e.target.value) });
    }
  };
  return (
    <div>
      <PersonForm
        title={"Creacion de persona"}
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        person={person}
        error={error}
        msg={msg}
      />
    </div>
  );
}
