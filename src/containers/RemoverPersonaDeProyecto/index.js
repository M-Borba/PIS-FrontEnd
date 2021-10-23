import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DeleteDialogContent from "../../components/DeleteDialogContent";
import { axiosInstance } from "../../config/axios";

RemoverPersona.propTypes = {
  personName: PropTypes.string.isRequired,
  personId: PropTypes.number.isRequired,
  projectName: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
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
  projectName,
  projectId,
  handleClose,
  setNotify,
}) {
  const dialogContent = `Esta seguro que desea eliminar a ${personName} de ${projectName}?`;

  const onConfirmation = () => {
    axiosInstance
      .get(`/person_project`)
      .then((response) => {
        //buscar persona en el arreglo
        let person = findPersonInPersonProjects(
          personId,
          response.data.person_project
        );
        if (person != undefined) {
          //busco las asignaciones del proyecto
          let dates = findDateInProject(projectId, person.projects);
          if (dates != undefined) {
            //itero en la lista de dates
            dates.forEach((assingment) => {
              axiosInstance
                .delete("person_project/" + assingment.id)
                .then((response) => {
                  let message = "Se ha borrado la asignacion exitosamente";
                  setNotify({
                    isOpen: true,
                    message: message,
                    type: "success",
                    reload: true,
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
            });
          } else {
            let message =
              "Error, parece que esa asignacion no existe, recargue la pagina e intente nuevamente";
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              reload: true,
            });
          }
        } else {
          let message =
            "Error, parece que esa asignacion no existe, recargue la pagina e intente nuevamente";
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            reload: true,
          });
        }
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
