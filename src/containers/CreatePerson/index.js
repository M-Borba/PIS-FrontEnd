/**
 * Create person
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import PersonForm from "../../components/PersonForm";
import propTypes from "prop-types";
import { rolesFormateados } from "../../config/globalVariables";
import TechnologyHandler from "../PersonTechnologyHandler";

CreatePerson.defaultProps = {
  person: {
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
    technologies: [],
  },
};
CreatePerson.propTypes = {
  setNotify: propTypes.func.isRequired,
  addRow: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function CreatePerson({ setNotify, addRow, onClose }) {
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    working_hours: 30,
    roles: [
      ["Desarrollador", false],
      ["Tester", false],
      ["Project Manager", false],
      ["Arquitecto", false],
      ["Diseñador", false],
      ["Analista", false],
    ],
    technologies: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var checkedRoles = Object.assign(person.roles);
    checkedRoles = checkedRoles
      .filter((rol) => rol[1] == true)
      .map((rol) => {
        rol[0].toLowerCase();
        return Object.keys(rolesFormateados).find(
          (key) => rolesFormateados[key] === rol[0]
        );
      });

    axiosInstance
      .post("/people", {
        person: {
          first_name: person.first_name,
          last_name: person.last_name,
          email: person.email,
          working_hours: person.working_hours,
          roles: checkedRoles,
          technologies: person.technologies,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          let personData = response.data.person;
          personData.roles = personData.roles.map((role) => {
            return `${rolesFormateados[role]} `;
          });
          let newRow = {
            fullName: personData.full_name,
            firstName: personData.first_name,
            lastName: personData.last_name,
            email: personData.email,
            id: personData.id,
            roles: personData.roles,
            cargaHoraria: personData.working_hours,
            tag: ".",
            technologies: personData.technologies,
          };
          addRow(newRow);
          setNotify({
            isOpen: true,
            message: `La persona se creo con exito.`,
            type: "success",
            reload: false,
          });
        } else
          setNotify({
            isOpen: true,
            message: `Error inesperado.`,
            type: "error",
            reload: false,
          });
        onClose();
      })
      .catch((error) => {
        console.error(error.response);
        let message = error.response.data.errors;
        setNotify({
          isOpen: true,
          message: message[Object.keys(message)[0]],
          type: "error",
          reload: false,
        });
      });
  };

  const checkInput = (event, type) => {
    if (person.roles.indexOf(event) !== -1) {
      console.log("in", event);
      let newRoles = person.roles;
      let i = 0;
      try {
        newRoles.forEach(([a, b]) => {
          //find index of selected role
          if (a == event[0]) throw Found;
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
      if (event.target.id == "first_name")
        setPerson({ ...person, first_name: event.target.value });
      else if (event.target.id == "last_name")
        setPerson({ ...person, last_name: event.target.value });
      else if (event.target.id == "email")
        setPerson({ ...person, email: event.target.value });
      else if (event.target.id == "working_hours")
        setPerson({ ...person, working_hours: parseInt(event.target.value) });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <PersonForm
        title={"Creacion de persona"}
        onSubmit={handleSubmit}
        onInputChange={checkInput}
        person={person}
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
