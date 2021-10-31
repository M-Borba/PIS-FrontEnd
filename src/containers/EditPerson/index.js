/**
 * Edit person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import { rolesFormateados } from "../../config/globalVariables";
import TechnologyHandler from "../../containers/PersonTechnologyHandler";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/people/" + id, {
        person: {
          first_name: person.first_name,
          last_name: person.last_name,
          email: person.email,
          working_hours: person.working_hours,
          technologies: person.technologies,
        },
      })
      .then((response) => {
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: `La persona ${personData.first_name} ${personData.last_name} se modifico con exito.`,
            type: "success",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status == 404) {
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
        } else {
          let message = error.response.data.errors;
          setNotify({
            isOpen: true,
            message: message[Object.keys(message)[0]],
            type: "error",
            reload: false,
          });
        }
      });
  };

  const checkInput = (event) => {
    if (event.target.id == "first_name")
      setPerson({ ...person, first_name: event.target.value });
    else if (event.target.id == "last_name")
      setPerson({ ...person, last_name: event.target.value });
    else if (event.target.id == "email")
      setPerson({ ...person, email: event.target.value });
    else if (event.target.id == "working_hours")
      setPerson({ ...person, working_hours: parseInt(event.target.value) });
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <PersonForm
        onSubmit={(e) => handleSubmit(e)}
        onInputChange={(e) => checkInput(e)}
        person={person}
        title={"Modificacion de Persona"}
      />
      <TechnologyHandler
        techSelected={person.technologies}
        setTechSelected={(techs) =>
          setPerson({ ...person, technologies: techs })
        }
      />
    </div>
  );
}
