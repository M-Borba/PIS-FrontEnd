import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  newNoteContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    gap: "24px",
    alignItems: "end",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "fit-content",
    color: COLORS.white,
    background: COLORS.backgroundBlack,
    "&:hover": {
      backgroundColor: COLORS.backgroundDarkGrey,
      color: COLORS.white,
    },
  },
}));
