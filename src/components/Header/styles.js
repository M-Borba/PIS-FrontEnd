import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";

export const Navbar = styled.div`
  height: 74px;
  padding: 0px 40px;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.div`
  padding: 0px 20px;
  border-radius: 0;
  text-transform: none;
  font-family: Nunito Sans;
  font-weight: 700;
  line-height: 20px;
  height: 94%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-bottom: 4.5px #6b5ecd solid;
  }
`;

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
    borderBottom: "10px #6b5ecd solid",
    boxSizing: "border-box",
    "& > div": { marginTop: "0.6vh" },
    "&:hover": {
      borderBottom: "10px #6b5ecd solid",
    },
  },
  userName: {
    width: "fit-content",
    backgroundColor: "#fff",
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "27px",
    color: "#252525",
    padding: "5px 15px 5px 7px",
    borderRadius: "50px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  userNameIcon: {
    marginRight: 5,
    backgroundColor: "#6b5ecd !important",
    color: "#fff",
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
