import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 10,
    background: COLORS.white,
  },
  list: {
    height: 250,
    fontWeight: 400,
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
}));
