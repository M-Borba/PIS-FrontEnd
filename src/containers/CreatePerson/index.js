/**
 * Create person
 */

import React, { useState, useRef } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import Dialog from "@material-ui/core/Dialog";
import InfoPopUp from "../../components/InfoPopUp";

export default function CreatePerson() {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
  });
  const [openPopUp, setOpenPopUp] = useState(false);
  const titlePopUp = useRef("");
  const contentPopUp = useRef("");

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/people", {
        person: person,
      })
      .then((response) => {
        if (response.status == 200) {
          titlePopUp.current = "Persona creada";
          contentPopUp.current = "La perosna se creo con exito.";
          setOpenPopUp(true);
        }
      })
      .catch((error) => {
        console.log("error", error.response);
        titlePopUp.current = "Error";
        let errors = error.response.data.errors;
        if (error.response.status == 400)
          contentPopUp.current =
            "Error, hay un problema con los datos ingresados - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
        else
          contentPopUp.current =
            "Error inesperado al enviar formulario - " +
            Object.keys(errors)[0] +
            " " +
            errors[Object.keys(errors)[0]];
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
