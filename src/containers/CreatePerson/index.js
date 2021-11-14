/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";

CreatePerson.propTypes = {
  addRow: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function CreatePerson({ addRow, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
    technologies: [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/people", {
        person,
      })
      .then((response) => {
        let personData = response.data.person;
        let nuevaPersona = {
          id: personData.id,
          fullName: personData.full_name,
          firstName: personData.first_name,
          lastName: personData.last_name,
          email: personData.email,
          cargaHoraria: personData.working_hours,
          technologies: personData.technologies,
        };
        addRow(nuevaPersona);
        enqueueSnackbar(`${personData.full_name} se ha creado exitosamente`, {
          variant: "success",
        });
        onClose();
      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  return (
    <PersonForm
      title={"Creación de persona"}
      onSubmit={handleSubmit}
      person={person}
      errors={errors}
      setErrors={setErrors}
      setPerson={setPerson}
    />
  );
}
