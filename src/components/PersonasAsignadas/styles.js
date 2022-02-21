import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: 600,
    overflow: "auto",
  },
  subtext: {
    paddingLeft: 25,
    color: COLORS.backgroundDarkGrey,
  },
}));
