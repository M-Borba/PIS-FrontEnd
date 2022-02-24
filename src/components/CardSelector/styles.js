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
    "&::-webkit-scrollbar-thumb": {
      background: COLORS.scrollThumb,
      borderRadius: 16,
      border: "solid 3px transparent",
      backgroundClip: "padding-box",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: COLORS.scrollThumbHover,
      borderRadius: 16,
      border: "solid 3px transparent",
      backgroundClip: " padding-box",
    },

    "&::-webkit-scrollbar": {
      background: "transparent",
      width: 14,
    },
  },

  button: {
    margin: theme.spacing(0.5, 0),
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#C7C7C7",
    bordeRadius: 16,
    border: "solid 3px transparent",
    backgroundClip: "padding-box",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    background: "#999999",
    borderRadius: 16,
    border: "solid 3px transparent",
    backgroundClip: " padding-box",
  },

  "&::-webkit-scrollbar": {
    background: "transparent",
    width: 14,
  },
}));
