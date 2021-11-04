import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AsignPersonForm from "../../components/AsignPersonForm";
import propTypes from "prop-types";
import { useStyles } from "./styles";

AgregarPersona.propTypes = {
  projectData: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    startDate: propTypes.string,
    endDate: propTypes.string,
  }).isRequired,
  setNotify: propTypes.func.isRequired,
};

export default function AgregarPersona({ projectData, setNotify }) {
  const [asignacion, setAsignacion] = useState({
    roles: [
      ["Desarrollador", false],
      ["PM", false],
      ["Tester", false],
      ["Arquitecto", false],
      ["Analista", false],
      ["Diseñador", false],
    ],
    people: [],
    startDate: projectData.startDate.replaceAll("/", "-"),
    endDate:
      projectData.endDate != null
        ? projectData.endDate.replaceAll("/", "-")
        : "",
    hours: 0,
    hoursType: "weekly",
  });

  const [error, setError] = useState("");

  const isValid = () => {
    return (
      asignacion.people != [],
      asignacion.roles != [],
      asignacion.startDate != "",
      asignacion.hours > 0,
      asignacion.hoursType != ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(asignacion)) {
      setError("Completar todos los campos para completar la asignación");
    } else {
      var body = Object.assign({}, asignacion);
      body.roles = body.roles
        .filter((rol) => rol[1] == true)
        .map((rol) => rol[0].toLowerCase()); //conseguir la lista de roles
      body.people = body.people
        .filter((rol) => rol[1] == true)
        .map((person) => person[0].slice(0, person[0].indexOf(" "))); //conseguir la lista de personas por id
      body.people.forEach((person) =>
        body.roles.forEach((role) =>
          axiosInstance
            .post("/people/" + person + "/person_project", {
              person_project: {
                project_id: projectData.id,
                role: role,
                working_hours: asignacion.hours,
                working_hours_type: asignacion.hoursType,
                start_date: asignacion.startDate.replaceAll("-", "/"),
                end_date: asignacion.endDate.replaceAll("-", "/"),
              },
            })
            .then((response) => {
              if (response.status == 200) {
                setNotify({
                  isOpen: true,
                  message: `Asignación creada exitosamente`,
                  type: "success",
                  reload: false,
                });
              } else {
                setNotify({
                  isOpen: true,
                  message: `Error inesperado en fetch de proyectos`,
                  type: "error",
                  reload: false,
                });
              }
            })
            .catch((error) => {
              console.log(error.response.status);
              if (
                error.response != undefined &&
                error.response.status != null &&
                error.response.status == 401
              )
                setNotify({
                  isOpen: true,
                  message: "Falta autentificarse!",
                  type: "error",
                  reload: false,
                });
              else if (error.response.status == 400) {
                let errors = error.response.data.errors;
                setNotify({
                  isOpen: true,
                  message:
                    "Error, hay un problema con los datos ingresados - " +
                    Object.keys(errors)[0] +
                    " " +
                    errors[Object.keys(errors)[0]],
                  type: "error",
                  reload: false,
                });
              } else
                setNotify({
                  isOpen: true,
                  message:
                    "Error inesperado al enviar formulario - " +
                    Object.keys(errors)[0] +
                    " " +
                    errors[Object.keys(errors)[0]],
                });
            })
        )
      );
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/people")
      .then((response) => {
        setAsignacion({
          ...asignacion,

          people: response.data.people.map((row) => [
            row.id + " - " + row.full_name,
            false,
          ]),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkInput = (value, type) => {
    console.log("value", value, type);
    if (type == "Rol") {
      let newRoles = asignacion.roles;
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
      setAsignacion({
        ...asignacion,
        roles: newRoles,
      });
    } else if (type == "Personas") {
      var newPeople = asignacion.people;
      newPeople[newPeople.indexOf(value)] = [value[0], !value[1]];
      setAsignacion({
        ...asignacion,
        people: newPeople,
      });
    } else if (type == undefined) {
      if (value.target.id == "startDate")
        setAsignacion({ ...asignacion, startDate: value.target.value });
      else if (value.target.id == "endDate") {
        setAsignacion({ ...asignacion, endDate: value.target.value });
      } else if (value.target.id == "workingHours") {
        setAsignacion({ ...asignacion, hours: value.target.value });
      } else if (value.target.name == "endDate") {
        setAsignacion({ ...asignacion, hoursType: value.target.value });
      }
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <AsignPersonForm
        onSubmit={handleSubmit}
        onInputChange={checkInput}
        asign={asignacion}
        error={error}
        title={"Asignando Persona a " + projectData.name}
      />
    </div>
  );
}
