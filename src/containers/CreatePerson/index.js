/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import { rolesFormateados } from "../../config/globalVariables";

CreatePerson.propTypes = {
  setNotify: propTypes.func.isRequired,
};

export default function CreatePerson({ setNotify }) {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
    technologies: [],
  });
  const [errors, setErrors] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/people", {
        person
      })
      .then(() => {
        setNotify({
          isOpen: true,
          message: `La persona se creo con exito.`,
          type: "success",
          reload: true,
        });

      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  return (
    <PersonForm
      title={"Creacion de persona"}
      onSubmit={handleSubmit}
      person={person}
      errors={errors}
      setErrors={setErrors}
      setPerson={setPerson}
    />
  );
}
