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
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function EditPerson({
  personData,
  id,
  setNotify,
  onClose,
  editRow,
}) {
  var completeRoles = [
    ["Desarrollador", false],
    ["PM", false],
    ["Tester", false],
    ["Arquitecto", false],
    ["Analista", false],
    ["Diseñador", false],
  ];

  const [person, setPerson] = useState({
    first_name: personData.first_name,
    last_name: personData.last_name,
    email: personData.email,
    working_hours: personData.working_hours,
    roles: completeRoles.map((rol) => {
      return [rol[0], personData.roles.indexOf(rol[0]) != -1];
    }),
    technologies: personData.technologies || [],
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
      .put("/people/" + id, {
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
          let personInfo = response.data.person;
          let person = {
            id: personInfo.id,
            fullName: personInfo.full_name,
            firstName: personInfo.first_name,
            lastName: personInfo.last_name,
            email: personInfo.email,
            cargaHoraria: personInfo.working_hours,
            tag: ".",
            technologies: personInfo.technologies,
          };
          editRow(person);
          setNotify({
            isOpen: true,
            message: `La persona ${personData.first_name} ${personData.last_name} se modifico con exito.`,
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
        if (error.response.status == 404) {
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
          onClose();
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

  const checkInput = (event, type) => {
    if (person.roles.indexOf(event) !== -1) {
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
