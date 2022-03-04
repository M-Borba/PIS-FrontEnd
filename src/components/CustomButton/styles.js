import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    fontSize: "18px",
    fontWeight: "700",
    borderRadius: "31px",
    padding: "7px 30px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
}));
