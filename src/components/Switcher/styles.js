import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "215px",
    height: "32px",
    padding: "0px",
    alignSelf: "center",
    color: "#FAFAFA",
  },
  switchBase: {
    // backgroundColor: "#252525",
    padding: "1px",
  },
  thumb: {
    color: "white",
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
    backgroundColor: "#252525 !important",
    opacity: "1 !important",
    zIndex: "-2",
    "&:after, &:before": {
      color: "white",
      fontSize: "14px",
      position: "absolute",
      top: "6px",
      fontWeight: "700",
    },
    "&:after": {
      content: "'Personas'",
      right: "27px",
      "&$Mui-checked": {
        color: "#252525",
      },
    },
    "&:before": {
      content: "'Proyectos'",
      left: "26px",
      zIndex: "1000",
      "&$Mui-checked": {
        color: "#252525",
      },
    },
  },
  checked: {
    transform: "translateX(104px) !important",
  },
}));
