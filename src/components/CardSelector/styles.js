import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 12),
    textAlign: "center",
    borderBottom: `2px solid ${COLORS.textFieldBorder}`,
  },
  list: {
    height: 250,
    overflow: "auto",
    marginTop: 4,
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
