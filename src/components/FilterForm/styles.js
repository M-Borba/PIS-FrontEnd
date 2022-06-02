import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: "1vh 2vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    padding: "20px 10px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    maxWidth: "1100px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1vw",
  },
  submit: {
    width: "50%",
  },
  clear: {
    "&:hover": {
      cursor: "pointer",
    },
    textDecorationLine: "underline",
    color: `${COLORS.primaryPurple} !important`,
  },
}));
