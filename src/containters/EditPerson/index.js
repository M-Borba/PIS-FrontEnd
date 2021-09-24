/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";

export default function Edit() {
  const [person, setPerson] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    hourly_load: "",
    hourly_load_hours: 30,
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
    e.preventDefault();
    if (!isValid(person)) {
      setError("Completar todos los campos para iniciar sesión");
    } else {
      axiosInstance
        .post("/people/" + person.id, {
          person: person,
        })
        .then((response) => {
          setMsg(response);
          setError("");
        })
        .catch((error) => {
          console.log(error.response);
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
      let hours = parseInt(e.target.value);
      setPerson({ ...person, working_hours: hours });
    }
    console.log("person", person);
  };
  return (
    <div>
      <PersonForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        person={person}
        error={error}
        msg={msg}
      />
    </div>
  );
}
