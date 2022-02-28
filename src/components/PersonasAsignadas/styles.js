import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: 600,
    overflow: "auto",
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
  subtext: {
    paddingLeft: 25,
    color: COLORS.backgroundDarkGrey,
  },
}));
