import React, { useEffect, useState, Fragment } from "react";
import propTypes from "prop-types";
import InfoAsignacionDialog from "../../components/InfoAsignacionDialog";
import Dialog from "@mui/material/Dialog";
import { axiosInstance } from "../../config/axios";
import Notificacion from "../../components/Notificacion";

InfoAsignacion.propTypes = {
  open: propTypes.bool.isRequired,
  projectName: propTypes.string.isRequired,
  personName: propTypes.string.isRequired,
  asignacionId: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
};

function InfoAsignacion({
  open,
  projectName,
  personName,
  asignacionId,
  onClose,
}) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [asignacionInfo, setAsignacionInfo] = useState({
    role: "",
    working_hours: 0,
    working_hours_type: "",
    start_date: "",
    end_date: "",
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Traigo asignacion
    open &&
      axiosInstance
        .get(`/person_project/${asignacionId}`)
        .then((response) => {
          if (response.status == 200) {
            let asignacionData = response.data.person_project;
            setAsignacionInfo({
              role: asignacionData.role,
              working_hours: asignacionData.working_hours,
              working_hours_type: asignacionData.working_hours_type,
              start_date: asignacionData.start_date,
              end_date: asignacionData.end_date,
            });
            setRoles(asignacionData.person.roles);
          } else
            setNotify({
              isOpen: true,
              message: `Error inesperado`,
              type: "error",
              reload: false,
            });
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 404) {
            let message = error.response.data.error;
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              reload: false,
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
          onClose();
        });
  }, [open]);

  const handleAplicarCambios = () => {
    // API call

    axiosInstance
      .put(`/person_project/${asignacionId}`, {
        person_project: asignacionInfo,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: "Los cambios se aplicaron con exito.",
            type: "success",
            reload: true,
          });
        else
          setNotify({
            isOpen: true,
            message: `Error inesperado`,
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
            reload: false,
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

  const handleDesasignar = () => {
    // API call

    axiosInstance
      .delete(`/person_project/${asignacionId}`)
      .then((response) => {
        console.log(response.data);
        if (response.status == 200)
          setNotify({
            isOpen: true,
            message: "Se elimino la asignacion con exito.",
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
        let message = error.response.data.error;
        setNotify({
          isOpen: true,
          message: message,
          type: "error",
          reload: false,
        });
      });
    onClose();
  };

  const onInputChange = (e) => {
    e.target.name == "rol" &&
      setAsignacionInfo({ ...asignacionInfo, role: e.target.value });
    e.target.id == "working_hours" &&
      setAsignacionInfo({ ...asignacionInfo, working_hours: e.target.value });
    e.target.name == "working_hours_type" &&
      setAsignacionInfo({
        ...asignacionInfo,
        working_hours_type: e.target.value,
      });
    e.target.id == "start_date" &&
      setAsignacionInfo({ ...asignacionInfo, start_date: e.target.value });
    e.target.id == "end_date" &&
      setAsignacionInfo({ ...asignacionInfo, end_date: e.target.value });
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        maxWidth={"xs"}
        hideBackdrop={true}
      >
        <InfoAsignacionDialog
          asignacionInfo={asignacionInfo}
          roles={roles}
          projectName={projectName}
          personName={personName}
          onClose={onClose}
          onChange={onInputChange}
          aplicarCambios={handleAplicarCambios}
          desasignar={handleDesasignar}
        />
      </Dialog>
      <Notificacion notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}

export default InfoAsignacion;
