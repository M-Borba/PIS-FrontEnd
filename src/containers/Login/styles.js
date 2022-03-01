import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  imgcontainer: {
    width: theme.typography.pxToRem(200),
    marginTop: theme.typography.pxToRem(40),
  },
  paper: {
    borderRadius: "16px !important",
  },
}));
