import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AsignPersonForm from "../../components/AsignPersonForm";
import propTypes from "prop-types";
import { useStyles } from "./styles";
import { ROLES_CHECKBOX, rolesTraducidos } from "../../config/globalVariables";
import { useSnackbar } from "notistack";

AgregarPersona.propTypes = {
  projectData: propTypes.object.isRequired,
  asignaciones: propTypes.array.isRequired,
  setAsignaciones: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  editRow: propTypes.func.isRequired,
};

export default function AgregarPersona({
  projectData,
  asignaciones,
  setAsignaciones,
  editRow,
  onClose,
}) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [asignacion, setAsignacion] = useState({
    roles: ROLES_CHECKBOX,
    people: [],
    startDate: projectData.start_date.replaceAll("/", "-"),
    endDate:
      projectData.end_Date != null
        ? projectData.end_Date.replaceAll("/", "-")
        : "",
    hours: 30,
    hoursType: "weekly",
  });

  const isValid = () => {
    return (
      asignacion.people != [],
      asignacion.roles != [],
      asignacion.startDate != "",
      asignacion.hours > 0,
      asignacion.hoursType != ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid(asignacion)) {
      setError("Completar todos los campos para completar la asignación");
    } else {
      var body = Object.assign({}, asignacion);
      let roles = body.roles
        .filter((rol) => rol[1] == true)
        .map((rol) => rol[0]); //conseguir la lista de roles
      let peopleIds = body.people
        .filter((rol) => rol[1] == true)
        .map((person) =>
          Object({
            id: person[0].id,
            name: person[0].full_name,
          })
        ); //conseguir la lista de personas por id
      let nuevasAsignaciones = asignaciones;
      let closeModal = true;
      for (const person of peopleIds) {
        for (const role of roles) {
          await axiosInstance
            .post("/people/" + person.id + "/person_project", {
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
              // Agrego a la persona con su rol al modal de desasignacion.
              let asignacionData = response.data.person_project;
              let indexAsignacion = nuevasAsignaciones.findIndex(
                (asignacion) => asignacion.id == person.id
              );
              let asignacion = {
                end_date: asignacionData.end_date,
                id: asignacionData.id,
                role: asignacionData.role,
                start_date: asignacionData.start_date,
              };
              if (indexAsignacion != -1)
                nuevasAsignaciones[indexAsignacion].roles = [
                  ...nuevasAsignaciones[indexAsignacion].roles,
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

              // Agrego a la persona a el modal de informacion del proyecto si no estaba.
              if (
                projectData.people.find(
                  (persona) => persona.id == asignacionData.person.id
                ) == undefined
              ) {
                let personaNueva = {
                  full_name: asignacionData.person.full_name,
                  id: asignacionData.person.id,
                };
                projectData.people = [...projectData.people, personaNueva];
                editRow(projectData);
              }

              enqueueSnackbar(
                `Se asigno el rol ${role} a: ${person.name} en ${projectData.name} con éxito.`,
                { variant: "success", autoHideDuration: 4000 }
              );
            })
            .catch((error) => {
              let message = error.response.data;
              console.log(message);
              enqueueSnackbar(
                message.error
                  ? message.error
                  : message.errors[Object.keys(message.errors)[0]],
                { variant: "error", autoHideDuration: 8000 }
              );
              closeModal = false;
            });
        }
      }
      closeModal && onClose();
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
    if (type == "Rol") {
      let newRoles = asignacion.roles;
      let i = 0;
      try {
        newRoles.forEach(([a, b]) => {
          //find indexAsignacion of selected role
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
