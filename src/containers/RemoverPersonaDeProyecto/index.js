import React from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";
import { useSnackbar } from "notistack";
import { BUTTON_LABELS } from "../../config/globalVariables";

RemoverPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  personId: PropTypes.number.isRequired,
  assignId: PropTypes.number,
  asignRole: PropTypes.string,
  asignClose: PropTypes.func.isRequired,
  projectData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  asignaciones: PropTypes.array.isRequired,
  setAsignaciones: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
};

function findPersonInPersonProjects(id, array) {
  var foundPerson = undefined;
  array.forEach((person) => {
    if (person.person.id === id) {
      foundPerson = person.person;
    }
  });
  return foundPerson;
}

function findDateInProject(id, array) {
  var foundDate = undefined;
  array.forEach((project) => {
    if (project.id === id) {
      foundDate = project.dates;
    }
  });
  return foundDate;
}

function removePerson(
  personId,
  personProject,
  projectData,
  asignaciones,
  setAsignaciones,
  editRow,
  enqueueSnackbar
) {
  //buscar la persona en el arreglo
  let person = findPersonInPersonProjects(personId, personProject);
  if (person) {
    //busco las asignaciones de la persona en el proyecto
    let dates = findDateInProject(projectData.id, person.projects);
    if (dates) {
      //itero en la lista de dates
      let nuevasAsignaciones = asignaciones;
      dates.forEach((assingment) => {
        axiosInstance
          .delete("person_project/" + assingment.id)
          .then((response) => {
            // Quito los roles de la persona.
            nuevasAsignaciones.forEach((persona) => {
              if (persona.id === personId)
                persona.roles = persona.roles.filter(
                  (asignacion) => asignacion.id !== assingment.id
                );
            });
            enqueueSnackbar(response.data.message, {
              variant: "success",
              autoHideDuration: 4000,
            });
          })
          .catch((error) => {
            console.error(error.response);
            enqueueSnackbar(error.response.data?.error, {
              variant: "error",
              autoHideDuration: 8000,
            });
          });
      });
      // Quito a la persona del modal de desasignacion.
      nuevasAsignaciones = nuevasAsignaciones.filter(
        (persona) => persona.id !== personId
      );
      setAsignaciones(nuevasAsignaciones);
      // Quito a la persona del modal de informacion del proyecto.
      projectData.people = projectData.people.filter(
        (persona) => persona.id !== personId
      );
      editRow(projectData);
    }
  }
}

function RemoverPersona({
  personName,
  personId,
  assignId,
  asignRole,
  asignClose,
  projectData,
  handleClose,
  asignaciones,
  setAsignaciones,
  editRow,
}) {
  const { enqueueSnackbar } = useSnackbar();
  let dialogContent;
  if (assignId)
    dialogContent = `¿Está seguro que desea eliminar a ${personName} de ${projectData.name} completamente?`;
  else
    dialogContent = `¿Está seguro que desea eliminar el rol ${asignRole} de ${personName} en ${projectData.name}?`;

  const onConfirmation = () => {
    if (assignId) {
      //si se quiere borrar a todas las asignaciones de una persona del proyecto
      axiosInstance
        .get(`/person_project`)
        .then((response) => {
          removePerson(
            personId,
            response.data.person_project,
            projectData,
            asignaciones,
            setAsignaciones,
            editRow,
            enqueueSnackbar
          );
          asignClose();
          handleClose();
        })
        .catch((error) => {
          console.error(error.response);
          enqueueSnackbar(error.response.data?.error, {
            variant: "error",
            autoHideDuration: 8000,
          });
        });
    } else {
      //se especifico la asignacion que se quiere borrar
      axiosInstance
        .delete("person_project/" + assignId)
        .then((response) => {
          // Quito el rol especificado.
          let nuevasAsignaciones = asignaciones;
          let personIndex;
          nuevasAsignaciones.forEach((persona, index) => {
            if (persona.id === personId) {
              personIndex = index;
              persona.roles = persona.roles.filter(
                (asignacion) => asignacion.id !== assignId
              );
            }
          });
          // Si no le quedan mas roles en el proyecto, quito a la persona del modal de informacion del proyecto y del modal de desasignacion.
          if (nuevasAsignaciones[personIndex].roles === 0) {
            nuevasAsignaciones = nuevasAsignaciones.filter(
              (persona) => persona.id !== personId
            );
            projectData.people = projectData.people.filter(
              (persona) => persona.id !== personId
            );
            editRow(projectData);
          }
          setAsignaciones(nuevasAsignaciones);

          enqueueSnackbar(response.data.message, {
            variant: "success",
            autoHideDuration: 4000,
          });
          asignClose();
          handleClose();
        })
        .catch((error) => {
          console.error(error.response);
          enqueueSnackbar(error.response.data?.error, {
            variant: "error",
            autoHideDuration: 8000,
          });
        });
    }
  };

  return (
    <DeleteDialogContent
      dialogContent={dialogContent}
      onClose={handleClose}
      onConfirmation={onConfirmation}
      deleteButtonText={BUTTON_LABELS.UNASSIGN}
    />
  );
}

export default RemoverPersona;
