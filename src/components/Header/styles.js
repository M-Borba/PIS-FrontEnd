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

export const UserName = styled.div`
  height: 25px;
  width: fit-content;
  background-color: #fff;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 27px;
  color: #252525;
  padding: 5px 20px;
  border-radius: 50px;
  cursor: pointer;
`;

export const Button = styled.div`
  padding: 0px 20px;
  border-radius: 0;
  text-transform: none;
  font-family: Nunito Sans;
  font-weight: 700;
  height: 94%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-bottom: 4px #6b5ecd solid;
  }
`;

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    height: 74,
    display: "flex",
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
