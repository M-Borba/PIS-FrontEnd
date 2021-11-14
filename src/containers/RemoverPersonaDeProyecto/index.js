import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

RemoverPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  personId: PropTypes.number.isRequired,
  asignId: PropTypes.number,
  asignRole: PropTypes.string,
  asignClose: PropTypes.func.isRequired,
  projectData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  asignaciones: PropTypes.array.isRequired,
  setAsignaciones: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
};

function findPersonInPersonProjects(id, array) {
  var foundPerson = undefined;
  array.forEach((person) => {
    if (person.person.id == id) {
      foundPerson = person.person;
    }
  });
  return foundPerson;
}

function findDateInProject(id, array) {
  var foundDate = undefined;
  array.forEach((project) => {
    if (project.id == id) {
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
  setNotify
) {
  //buscar la persona en el arreglo
  let person = findPersonInPersonProjects(personId, personProject);
  if (person != undefined) {
    //busco las asignaciones de la persona en el proyecto
    let dates = findDateInProject(projectData.id, person.projects);
    if (dates != undefined) {
      //itero en la lista de dates
      let nuevasAsignaciones = asignaciones;
      dates.forEach((assingment) => {
        axiosInstance
          .delete("person_project/" + assingment.id)
          .then(() => {
            // Quito los roles de la persona.
            nuevasAsignaciones.forEach((persona) => {
              if (persona.id == personId)
                persona.roles = persona.roles.filter(
                  (asignacion) => asignacion.id != assingment.id
                );
            });
            let message = "Se ha borrado la asignación exitosamente";
            setNotify({
              isOpen: true,
              message: message,
              type: "success",
              reload: false,
            });
          })
          .catch((error) => {
            let message = error?.response?.data.error;
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              reload: true,
            });
          });
      });
      // Quito a la persona del modal de desasignacion.
      nuevasAsignaciones = nuevasAsignaciones.filter(
        (persona) => persona.id != personId
      );
      setAsignaciones(nuevasAsignaciones);
      // Quito a la persona del modal de informacion del proyecto.
      projectData.people = projectData.people.filter(
        (persona) => persona.id != personId
      );
      editRow(projectData);
    }
  }
}

function RemoverPersona({
  personName,
  personId,
  asignId,
  asignRole,
  asignClose,
  projectData,
  handleClose,
  setNotify,
  asignaciones,
  setAsignaciones,
  editRow,
}) {
  var dialogContent;
  if (asignId == undefined)
    dialogContent = `¿Está seguro que desea eliminar a ${personName} de ${projectData.name} completamente?`;
  else
    dialogContent = `¿Está seguro que desea eliminar el rol ${asignRole} de ${personName} en ${projectData.name}?`;

  const onConfirmation = () => {
    if (asignId == undefined) {
      //si se quiere borrar a todas las asignaciones de una persona personas del proyecto
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
            setNotify
          );
        })
        .catch((error) => {
          let message = error?.response?.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
        });
    } else {
      //se especifico la asignacion que se quiere borrar
      axiosInstance
        .delete("person_project/" + asignId)
        .then(() => {
          // Quito el rol especificado.
          let nuevasAsignaciones = asignaciones;
          let personIndex;
          nuevasAsignaciones.forEach((persona, index) => {
            if (persona.id == personId) {
              personIndex = index;
              persona.roles = persona.roles.filter(
                (asignacion) => asignacion.id != asignId
              );
            }
          });
          // Si no le quedan mas roles en el proyecto, quito a la persona del modal de informacion del proyecto y del modal de desasignacion.
          if (nuevasAsignaciones[personIndex].roles == 0) {
            nuevasAsignaciones = nuevasAsignaciones.filter(
              (persona) => persona.id != personId
            );
            projectData.people = projectData.people.filter(
              (persona) => persona.id != personId
            );
            editRow(projectData);
          }
          setAsignaciones(nuevasAsignaciones);

          let message = "Se ha borrado la asignación exitosamente";
          setNotify({
            isOpen: true,
            message: message,
            type: "success",
            reload: false,
          });
        })
        .catch((error) => {
          console.error(error.response);
          let message = error.response.data.error;
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
        });
    }
    asignClose();
    handleClose();
  };

  return (
    <Fragment>
      <DeleteDialogContent
        dialogContent={dialogContent}
        onClose={handleClose}
        onConfirmation={onConfirmation}
      />
    </Fragment>
  );
}

export default RemoverPersona;
