/**
 * Edit person
 */

import React, { useState, useRef } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

Edit.propTypes = {
  personData: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
  }).isRequired,
  id: propTypes.number,
};

export default function Edit({ personData, id }) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [person, setPerson] = useState(personData);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/people/" + id, {
        person: person,
      })
      .then((response) => {
        if (response.status == 200) {
          titlePopUp.current = "Persona modificada";
          contentPopUp.current = "La persona se modifico con exito.";
          setOpenPopUp(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
        titlePopUp.current = "Error al modificar persona";
        if (error.response.status == 400) {
          let errors = error.response.data.errors;
          contentPopUp.current =
            "Error, hay un problema con los datos ingresados - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
        } else if (error.response.status == 404)
          contentPopUp.current =
            "La persona que intenta modificar ya fue eliminada.";
        else contentPopUp.current = "Error inesperado al enviar formulario.";
        setOpenPopUp(true);
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
      <Dialog
        open={openPopUp}
        onClose={handleClosePopUp}
        maxWidth="xs"
        aria-labelledby="error-dialog-title"
      >
        <InfoPopUp
          title={titlePopUp.current}
          content={contentPopUp.current}
          onConfirm={handleClosePopUp}
          onClose={handleClosePopUp}
        />
      </Dialog>
    </div>
  );
}
