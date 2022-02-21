import { makeStyles } from "@material-ui/core/styles";

import { COLORS, SWITCHER_LABELS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "215px",
    height: "32px",
    padding: "0px",
    alignSelf: "center",
    color: COLORS.backgroundWhite,
  },
  switchBase: {
    padding: "1px",
  },
  thumb: {
    color: COLORS.white,
    width: "105px",
    height: "26px",
    marginTop: "2px",
    marginLeft: "2px",
    borderRadius: "17px",
    zIndex: "-1",
    opacity: "0.5",
  },
  track: {
    borderRadius: "15px",
    backgroundColor: `${COLORS.backgroundDarkestGrey} !important`,
    opacity: "1 !important",
    zIndex: "-2",
    "&:after, &:before": {
      color: COLORS.white,
      fontSize: "14px",
      position: "absolute",
      top: "6px",
      fontWeight: "700",
    },
    "&:after": {
      content: SWITCHER_LABELS.PERSONAS,
      right: "27px",
    },
    "&:before": {
      content: SWITCHER_LABELS.PROYECTOS,
      left: "26px",
      zIndex: "1000",
    },
  },
  checked: {
    transform: "translateX(104px) !important",
  },
}));
