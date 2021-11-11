import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  notification: {
    position: 'absolute',
    width: 300,
    maxHeight: 400,
    overflow: 'auto',
    backgroundColor: '#efefef',
    zIndex: 2,
  },
  item: {
    color: '#000'
  }
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
