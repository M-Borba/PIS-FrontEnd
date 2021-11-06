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
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  asignaciones: PropTypes.array.isRequired,
  setAsignaciones: PropTypes.func.isRequired,
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

function RemoverPersona({
  personName,
  personId,
  asignId,
  asignRole,
  asignClose,
  projectName,
  projectId,
  handleClose,
  setNotify,
  asignaciones,
  setAsignaciones,
}) {
  var dialogContent;
  if (asignId == undefined)
    dialogContent = `Esta seguro que desea eliminar a ${personName} de ${projectName} completamente?`;
  else
    dialogContent = `Esta seguro que desea eliminar el rol ${asignRole} de ${personName} en ${projectName}?`;

  const onConfirmation = () => {
    if (asignId == undefined) {
      //si se quiere borrar a todas las asignaciones de una persona personas del proyecto
      axiosInstance
        .get(`/person_project`)
        .then((response) => {
          //buscar la persona en el arreglo
          let person = findPersonInPersonProjects(
            personId,
            response.data.person_project
          );
          if (person != undefined) {
            //busco las asignaciones de la persona en el proyecto
            let dates = findDateInProject(projectId, person.projects);
            if (dates != undefined) {
              //itero en la lista de dates
              dates.forEach((assingment) => {
                axiosInstance
                  .delete("person_project/" + assingment.id)
                  .then(() => {
                    let nuevasAsignaciones = asignaciones;
                    nuevasAsignaciones.forEach((persona) => {
                      if (persona.id == personId) {
                        persona.roles = persona.roles.filter(
                          (asignacion) => asignacion.id != assingment.id
                        );
                      }
                    });
                    nuevasAsignaciones = nuevasAsignaciones.filter(
                      (asignacion) => asignacion.roles.length > 0
                    );
                    setAsignaciones(nuevasAsignaciones);
                    let message = "Se ha borrado la asignacion exitosamente";
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
              });
            }
          }
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
    } else {
      //se especifico la asignacion que se quiere borrar
      axiosInstance
        .delete("person_project/" + asignId)
        .then(() => {
          let nuevasAsignaciones = asignaciones;
          nuevasAsignaciones.forEach((persona) => {
            if (persona.id == personId) {
              persona.roles = persona.roles.filter(
                (asignacion) => asignacion.id != asignId
              );
            }
          });
          nuevasAsignaciones = nuevasAsignaciones.filter(
            (asignacion) => asignacion.roles.length > 0
          );
          setAsignaciones(nuevasAsignaciones);
          let message = "Se ha borrado la asignacion exitosamente";
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
