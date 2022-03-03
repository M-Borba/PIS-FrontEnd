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

  button: {
    marginBottom: 15,
  },

  divider: {
    marginBottom: "5px !important",
  },

  dialogTitle: {
    color: COLORS.black,
    fontSize: "1.75rem !important",
  },

  paper: {
    margin: theme.spacing(4, 4),
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: 500,
    overflow: "auto",
  },

  list: {
    height: "100%",
    width: "100%",
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
