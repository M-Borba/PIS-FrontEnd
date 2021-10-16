/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";

CreatePerson.propTypes = {
  setNotify: propTypes.func.isRequired,
};

export default function CreatePerson({ setNotify }) {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/people", {
        person: person,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `La perosna se creo con exito.`,
            type: "success",
            reload: true,
          });
      })
      .catch((error) => {
        console.log("error", error.response);
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message: `Error, hay un problema con los datos ingresados - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}`,
            type: "error",
            reload: false,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado al enviar formulario - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}`,
            type: "error",
            reload: false,
          });
      });
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
        title={"Alta de persona"}
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        person={person}
      />
    </div>
  );
}
