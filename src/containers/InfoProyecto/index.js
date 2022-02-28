import React, { useState } from "react";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../config/axios";
import InfoProyectoForm from "./InfoProyectoForm";

InfoProyecto.propTypes = {
  projectData: propTypes.object.isRequired,
  type: propTypes.string,
  onClose: propTypes.func,
  updateProjectState: propTypes.func,
};

export default function InfoProyecto({
  projectData,
  type,
  onClose,
  updateProjectState,
}) {
  const [project_state, setProjectState] = useState(projectData.project_state);
  const initialState = projectData.project_state;
  const { enqueueSnackbar } = useSnackbar();

  const handleApplyChanges = (e, projectData) => {
    if (initialState !== project_state) {
      projectData.project_state = project_state;
      axiosInstance
        .put(`/projects/${projectData.id}`, {
          project: projectData,
        })
        .then((response) => {
          updateProjectState(projectData);
          enqueueSnackbar(
            `El proyecto ${projectData.name} se actualizó con éxito.`,
            {
              variant: "success",
              autoHideDuration: 4000,
            }
          );
        })
        .catch((error) => {
          enqueueSnackbar(
            `El proyecto ${projectData.name} no se actualizó con éxito.`,
            {
              variant: "error",
              autoHideDuration: 4000,
            }
          );
        });
    }
    e.preventDefault();
    onClose();
  };

  return (
    <div style={{ padding: 30 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <AssignmentIcon
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Typography
          variant="h4"
          style={{ marginLeft: 10, overflowWrap: "break-word" }}
        >
          {projectData.name}
        </Typography>
      </div>
      <Divider style={{ marginBottom: 15, marginTop: 15 }} />
      <InfoProyectoForm
        projectData={projectData}
        handleApplyChanges={handleApplyChanges}
        project_state={project_state}
        setProjectState={setProjectState}
        onClose={onClose}
        type={type}
      />
    </div>
  );
}
