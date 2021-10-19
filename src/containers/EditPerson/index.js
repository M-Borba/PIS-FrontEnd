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
    roles: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  resultOk: propTypes.bool,
};

export default function Edit({ personData, id, resultOk }) {
  var completeRoles = [
    ["Developer", false],
    ["PM", false],
    ["Tester", false],
    ["Architect", false],
    ["Analyst", false],
    ["Designer", false],
  ];

  personData.roles.forEach((role) => {
    var formattedRole;
    if (role == "pm")
      //hardcodeado porque bueno, es el unico rol que no tiene mayuscula al principio
      formattedRole = "PM";
    else formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    var i = 0;

    try {
      completeRoles.forEach(([a, b]) => {
        //find index of selected role
        if (a == formattedRole) throw Found;
        if (i != completeRoles.length - 1) i++;
      });
    } catch (e) {
      //index was found, do nothing :)
    }

    if (i != completeRoles.length - 1)
      //role was found
      completeRoles[i] = [formattedRole, true];
    else
      console.log("Error: Hubo un error identificando los roles de la persona");
  });

  const [person, setPerson] = useState({
    first_name: personData.first_name,
    last_name: personData.last_name,
    email: personData.email,
    working_hours: personData.working_hours,
    roles: completeRoles,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const isValid = () => {
    return (
      person.first_name != "" &&
      person.last_name != "" &&
      person.email != "" &&
      person.working_hours != ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(person)) {
      setError("Completar todos los campos para completar la modificación");
    } else {
      var checkedRoles = Object.assign(person.roles);
      checkedRoles = checkedRoles
        .filter((rol) => rol[1] == true)
        .map((rol) => rol[0].toLowerCase()); //conseguir la lista de roles checkeados

      axiosInstance
        .put("/people/" + id, {
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
        onSubmit={handleSubmit}
        onInputChange={checkInput}
        person={person}
        error={error}
        msg={msg}
        title={"Editando Persona"}
      />
    </div>
  );
}
