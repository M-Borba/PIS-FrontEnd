import React, { useEffect } from "react";
import { DialogTitle } from "@mui/material";
import propTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import { BUTTON_LABELS, PROJECT_LABELS } from "../../config/globalVariables";
import { useStyles } from "./styles";
import CustomButton from "../CustomButton";
import AssignExtendItems from "./AssignExtendItems";
import { axiosInstance } from "../../config/axios";

AssignExtendDialog.propTypes = {
  handleClose: propTypes.func.isRequired,
  // onClose: propTypes.func.isRequired,
  // onSubmit: propTypes.func.isRequired,
  project: propTypes.object.isRequired,
  assignations: propTypes.array.isRequired,
};

export default function AssignExtendDialog({
  assignations,
  handleClose,
  project,
}) {
  const classes = useStyles();
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
            .then((r) => console.log(r));
        });
        console.log(assignation);
      }
    });
  };

  return (
    <>
      <DialogTitle>
        {PROJECT_LABELS.EXTENSION_ASIGNACION}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <AssignExtendItems
        assignations={assignations}
        selected={selected}
        setSelected={setSelected}
      />
      <CustomButton
        onClick={() => {
          console.log(selected);
          handleSubmit();
          // handleClose();
        }}
        text={BUTTON_LABELS.APPLY_CHANGES}
        variant="contained"
      />
    </>
  );
}
