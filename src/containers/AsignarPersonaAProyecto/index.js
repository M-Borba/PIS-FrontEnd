import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AsignPersonForm from "../../components/AsignPersonForm";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import { ROLES_CHECKBOX, rolesTraducidos } from "../../config/globalVariables";

AgregarPersona.propTypes = {
  projectData: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    startDate: propTypes.string,
    endDate: propTypes.string,
  }).isRequired,
  setNotify: propTypes.func.isRequired,
  asignaciones: propTypes.array.isRequired,
  setAsignaciones: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function AgregarPersona({
  projectData,
  setNotify,
  asignaciones,
  setAsignaciones,
  onClose,
}) {
  const classes = useStyles();
  const [asignacion, setAsignacion] = useState({
    roles: ROLES_CHECKBOX,
    people: [],
    startDate: projectData.startDate.replaceAll("/", "-"),
    endDate:
      projectData.endDate != null
        ? projectData.endDate.replaceAll("/", "-")
        : "",
    hours: 30,
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
      body.roles = body.roles.map((rol) => rol[0]); //conseguir la lista de roles
      body.people = body.people
        .filter((rol) => rol[1] == true)
        .map((person) => person[0].id); //conseguir la lista de personas por id
      let nuevasAsignaciones = asignaciones;
      body.people.forEach((person) =>
        body.roles.forEach((role) => {
          console.log("r", role);
          axiosInstance
            .post("/people/" + person + "/person_project", {
              person_project: {
                project_id: projectData.id,
                role: rolesTraducidos[role],
                working_hours: asignacion.hours,
                working_hours_type: asignacion.hoursType,
                start_date: asignacion.startDate.replaceAll("-", "/"),
                end_date: asignacion.endDate.replaceAll("-", "/"),
              },
            })
            .then((response) => {
              let asignacionData = response.data.person_project;
              let index = nuevasAsignaciones.findIndex(
                (asignacion) => asignacion.id == person
              );
              let asignacion = {
                end_date: asignacionData.end_date,
                id: asignacionData.id,
                role: asignacionData.role,
                start_date: asignacionData.start_date,
              };
              if (index != -1)
                nuevasAsignaciones[index].roles = [
                  ...nuevasAsignaciones[index].roles,
                  asignacion,
                ];
              else {
                let persona = {
                  id: asignacionData.person.id,
                  name: asignacionData.person.full_name,
                  roles: [asignacion],
                };
                nuevasAsignaciones = [...nuevasAsignaciones, persona];
              }
              setAsignaciones(nuevasAsignaciones);
              setNotify({
                isOpen: true,
                message: `Asignación creada exitosamente`,
                type: "success",
                reload: false,
              });
              onClose();
            })
            .catch((error) => {
              console.log(error.response.status);
              if (error.response.status == 400) {
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
                  message: error.response.data.error,
                  type: "error",
                  reload: false,
                });
            });
        })
      );
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/people")
      .then((response) => {
        setAsignacion({
          ...asignacion,
          people: response.data.people.map((row) => [row, false]),
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
      console.log("value", value);
      let newPeople = [...asignacion.people].map(([p, v]) =>
        p.id == value[0].id ? [p, !v] : [p, v]
      );
      setAsignacion({
        ...asignacion,
        people: newPeople,
      });
    } else {
      if (value.target.name == "startDate") {
        setAsignacion({ ...asignacion, startDate: value.target.value });
      } else if (value.target.name == "endDate") {
        setAsignacion({ ...asignacion, endDate: value.target.value });
      } else if (value.target.name == "workingHours") {
        setAsignacion({ ...asignacion, hours: value.target.value });
      } else if (value.target.name == "hoursType") {
        setAsignacion({ ...asignacion, hoursType: value.target.value });
      }
    }
  };

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
