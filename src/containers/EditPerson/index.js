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
  setNotify: propTypes.func.isRequired,
};

export default function Edit({ personData, id, setNotify }) {
  const [person, setPerson] = useState(personData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/people/" + id, {
        person: person,
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `La persona ${personData.first_name} ${personData.last_name} se modifico con exito.`,
            type: "success",
            reload: true,
          });
      })
      .catch((error) => {
        console.log(error.response);
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message: `Error, hay un problema con los datos ingresados - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}.`,
            type: "error",
            reload: false,
          });
        else if (error.response.status == 404)
          setNotify({
            isOpen: true,
            message: `Error, la perosna ${personData.first_name} ${personData.last_name} ya fue eliminada.`,
            type: "error",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado al enviar formulario - ${
              Object.keys(errors)[0]
            } ${errors[Object.keys(errors)[0]]}.`,
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
        title={"Modificacion de Persona"}
      />
    </div>
  );
}
