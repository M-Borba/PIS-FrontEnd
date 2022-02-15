import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: "10 !important",
    paddingBottom: "0 !important",
  },
  content: {
    width: "50%",
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: "0 !important",
  },
  actions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    bottom: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  jC_sb: {
    justifyContent: "space-between",
  },
  working_hours_type_width: {
    with: theme.spacing(1),
  },
  fWidth: {
    width: "100% !important",
  },
  textClass: {
    wordWrap: "break-word",
  },
  submit: {
    color: "#ffffff",
    backgroundColor: "#1C1C1C",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#404040",
      color: "#fff",
    },
  },
  secondary: {
    color: "#1C1C1C",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "#404040",
    },
  },
}));
