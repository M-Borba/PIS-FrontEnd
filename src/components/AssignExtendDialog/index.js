import React, { useEffect } from "react";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";
import { DialogTitle } from "@mui/material";
import Divider from "@mui/material/Divider";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import {
  BUTTON_LABELS,
  PROJECT_LABELS,
  REQUEST_LABELS,
} from "../../config/globalVariables";
import { useStyles } from "./styles";
import CustomButton from "../CustomButton";
import AssignExtendItems from "./AssignExtendItems";
import { axiosInstance } from "../../config/axios";

AssignExtendDialog.propTypes = {
  handleClose: propTypes.func.isRequired,
  project: propTypes.object.isRequired,
  assignations: propTypes.array.isRequired,
};

export default function AssignExtendDialog({
  assignations,
  handleClose,
  project,
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    setSelected(assignations.map((assignation) => false));
  }, []);

  const handleSubmit = () => {
    selected.forEach((selected, index) => {
      if (selected) {
        const assignation = assignations[index];
        assignation.roles.forEach((role) => {
          role.end_date = project.end_date;
          axiosInstance
            .put(`/person_project/${role.id}`, {
              person_project: role,
            })
            .then((r) => {
              enqueueSnackbar(`${REQUEST_LABELS.UPDATE_SUCCESS}`, {
                variant: "success",
                autoHideDuration: 4000,
              });
            });
        });
      }
    });
  };

  return (
    <div className={classes.paper}>
      <DialogTitle className={classes.dialogTitle}>
        {PROJECT_LABELS.EXTENSION_ASIGNACION}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider flexItem />
      <AssignExtendItems
        assignations={assignations}
        selected={selected}
        setSelected={setSelected}
      />
      <Divider flexItem className={classes.divider} />
      <CustomButton
        onClick={() => {
          handleSubmit();
          handleClose();
        }}
        variant="contained"
      >
        {BUTTON_LABELS.EXTEND_ASSIGNATIONS}
      </CustomButton>
    </div>
  );
}
