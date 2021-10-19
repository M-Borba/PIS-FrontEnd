/**
 * Create person
 */

import React, { useState } from "react";
import propTypes from "prop-types";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import PropTypes from "prop-types";

CreatePerson.propTypes = {
  resultOk: PropTypes.bool,
};

export default function CreatePerson({ resultOk }) {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
    roles: [
      ["Developer", false],
      ["PM", false],
      ["Tester", false],
      ["Architect", false],
      ["Analyst", false],
      ["Designer", false],
    ],
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
    setMsg("");
    e.preventDefault();
    if (!isValid(person)) {
      setError("Completar todos los campos para iniciar sesión");
    } else {
      var checkedRoles = Object.assign(person.roles);
      checkedRoles = checkedRoles
        .filter((rol) => rol[1] == true)
        .map((rol) => rol[0].toLowerCase()); //conseguir la lista de roles checkeados

      axiosInstance
        .post("/people", {
          person: {
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email,
            working_hours: person.working_hours,
            roles: checkedRoles,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            resultOk();
            setMsg("Usuario creado correctamente");
            setError("");
          } else setError("Error inesperado");
        })
        .catch((error) => {
          console.log("error", error.response);
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
  const checkInput = (value, type) => {
    if (type == "Rol") {
      let newRoles = person.roles;
      let i = 0;
      try {
        newRoles.forEach(([a, b]) => {
          //find index of selected role
          if (a == value[0]) throw Found;
          if (i != newRoles.length - 1) i++;
        });
      } catch (e) {
        //do nothing :)
      }
      if (i != -1) newRoles[i][1] = !newRoles[i][1];
      setPerson({
        ...person,
        roles: newRoles,
      });
    } else if (type == undefined) {
      if (value.target.id == "first_name")
        setPerson({ ...person, first_name: value.target.value });
      else if (value.target.id == "last_name")
        setPerson({ ...person, last_name: value.target.value });
      else if (value.target.id == "email")
        setPerson({ ...person, email: value.target.value });
      else if (value.target.id == "working_hours")
        setPerson({ ...person, working_hours: parseInt(value.target.value) });
    }
  };
  return (
    <div>
      <PersonForm
        title={"Creación de persona"}
        onSubmit={handleSubmit}
        onInputChange={checkInput}
        person={person}
        error={error}
        msg={msg}
      />
    </div>
  );
}
