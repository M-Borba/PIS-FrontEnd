/**
 * Edit person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";

EditPerson.propTypes = {
  personData: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
    technologies: propTypes.array,
    roles: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
};

export default function EditPerson({ personData, id, setNotify }) {
  const [person, setPerson] = useState({
    first_name: personData.first_name,
    last_name: personData.last_name,
    email: personData.email,
    working_hours: personData.working_hours,
    technologies: personData.technologies || [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/people/${id}`, {
        person: {
          first_name: person.first_name,
          last_name: person.last_name,
          email: person.email,
          working_hours: person.working_hours,
          technologies: person.technologies,
        },
      })
      .then(() => {
        setNotify({
          isOpen: true,
          message: `La persona ${personData.first_name} ${personData.last_name} se modifico con exito.`,
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
      title={"Modificacion de Persona"}
      onSubmit={handleSubmit}
      person={person}
      errors={errors}
      setErrors={setErrors}
      setPerson={setPerson}
    />
  );
}
