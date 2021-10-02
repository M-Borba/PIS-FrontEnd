/**
 * Edit person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";

Edit.propTypes = {
  personData: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
  }).isRequired,
  id: propTypes.number,
  resultOk: propTypes.bool,
};

export default function Edit({ personData, id, resultOk }) {
  const [person, setPerson] = useState(personData);
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
      setError("Completar todos los campos para completar la modificación");
    } else {
      axiosInstance
        .put("/people/" + id, {
          person: person,
        })
        .then((response) => {
          if (response.status == 200) {
            resultOk();
            setMsg("Usuario modificado correctamente");
            setError("");
          } else setError("Error inesperado");
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
          } else setError("Error inesperado al enviar formulario ");
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
  };
  return (
    <div>
      <PersonForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        person={person}
        error={error}
        msg={msg}
        title={"Editando Persona"}
      />
    </div>
  );
}
