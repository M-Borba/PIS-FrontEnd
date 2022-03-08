import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    height: 74,
    display: "flex",
    fontSize: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  menuLink: {
    textDecoration: "none",
    color: "black",
  },
  mr5: {
    marginRight: 5,
  },
  mt35: {
    marginTop: 35,
  },
  selected: {
    borderBottom: `10px ${COLORS.primaryPurple} solid`,
    boxSizing: "border-box",
    "& > div": { marginTop: "0.5vh" },
    "&:hover": {
      borderBottom: `10px ${COLORS.primaryPurple} solid`,
    },
  },
  button: {
    padding: "0px 20px",
    borderRadius: 0,
    textTransform: "none",
    fontWeight: 700,
    height: "94%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      borderBottom: `4.5px ${COLORS.primaryPurple} solid`,
    },
  },
  navbar: {
    height: 74,
    padding: "0 40px",
    backgroundColor: COLORS.backgroundDarkestGrey,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userName: {
    width: "fit-content",
    backgroundColor: COLORS.white,
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "27px",
    color: COLORS.backgroundDarkestGrey,
    padding: "5px 15px 5px 7px",
    borderRadius: "50px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  userNameIcon: {
    marginRight: 8,
    backgroundColor: `${COLORS.primaryPurple} !important`,
    color: `${COLORS.white} !important`,
  },
}));

export const PaperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

export const anchorElPoint = {
  horizontal: "center",
  vertical: "bottom",
};
