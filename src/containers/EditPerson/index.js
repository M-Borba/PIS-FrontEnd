/**
 * Edit person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import { rolesFormateados } from "../../config/globalVariables";

Edit.propTypes = {
  personData: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
    roles: propTypes.array,
  }).isRequired,
  id: propTypes.number,
  setNotify: propTypes.func.isRequired,
};

export default function Edit({ personData, id, setNotify }) {
  var completeRoles = [
    ["Desarrollador", false],
    ["Project Manager", false],
    ["Tester", false],
    ["Arquitecto", false],
    ["Diseñador", false],
    ["Analista", false],
  ];

  personData.roles.forEach((role) => {
    var formattedRole = role.trim();
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

    if (i != completeRoles.length)
      //role was found
      completeRoles[i] = [formattedRole, true];
    else {
      console.log("Error: Hubo un error identificando los roles de la persona");
    }
  });

  const [person, setPerson] = useState({
    first_name: personData.first_name,
    last_name: personData.last_name,
    email: personData.email,
    working_hours: personData.working_hours,
    roles: completeRoles,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var checkedRoles = Object.assign(person.roles);
    checkedRoles = checkedRoles
      .filter((rol) => rol[1] == true)
      .map((rol) => {
        rol[0].toLowerCase()
        return Object.keys(rolesFormateados).find(key => rolesFormateados[key] === rol[0]);
      });

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
    <PersonForm
      onSubmit={handleSubmit}
      onInputChange={checkInput}
      person={person}
      title={"Modificacion de Persona"}
    />
  );
}
