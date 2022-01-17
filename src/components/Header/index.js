import React, { useState, Fragment } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  useStyles,
  PaperProps,
  anchorElPoint,
  Navbar,
  UserName,
  Button,
} from "./styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { Tooltip } from "@material-ui/core";

import AdministratorsIcon from "../../assets/icons/AdministratorsIcon.svg";
import HomeIcon from "../../assets/icons/HomeIcon.svg";
import PersonsIcon from "../../assets/icons/PersonsIcon.svg";
import ProjectsIcon from "../../assets/icons/ProjectsIcon.svg";
import logoEFFE from "../../assets/icons/logoEFFE.svg";
import EFFElogoname from "../../assets/icons/EFFElogoname.svg";

export default function Header() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const classes = useStyles();
  const [username] = useState(uid);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    axiosInstance
      .delete("/users/sign_out")
      .then(() => {
        //logout en la api
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("token"); //borrado local
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
  };

  return (
    <Navbar>
      <div className={classes.title}>
        <Link className={classes.link} to="/inicio">
          <Button>
            <img
              style={{ width: 13, marginRight: 9 }}
              src={HomeIcon}
              alt="home"
            />
            Inicio
          </Button>
        </Link>
        <Link className={classes.link} to="/proyectos">
          <Button>
            <img
              style={{ width: 13, marginRight: 9 }}
              src={ProjectsIcon}
              alt="home"
            />
            Proyectos
          </Button>
        </Link>
        <Link className={classes.link} to="/personas">
          <Button>
            <img
              style={{ width: 13, marginRight: 9 }}
              src={PersonsIcon}
              alt="home"
            />
            Personas
          </Button>
        </Link>
        <Link className={classes.link} to="/administradores">
          <Button>
            <img
              style={{ width: 13, marginRight: 9 }}
              src={AdministratorsIcon}
              alt="home"
            />
            Administradores
          </Button>
        </Link>
      </div>
      <div style={{ position: "relative" }}>
        <img
          src={logoEFFE}
          alt="logo"
          style={{ position: "absolute", top: -15, left: -74 }}
        />
        <img src={EFFElogoname} alt="logo" />
      </div>
      <Fragment>
        <Tooltip title="Configuración de la cuenta">
          <UserName data-testid="menu-perfil" onClick={handleMenu}>
            {username.split("@")[0]}
          </UserName>
        </Tooltip>
        <Menu
          className={classes.mt35}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={PaperProps}
          transformOrigin={anchorElPoint}
          anchorOrigin={anchorElPoint}
        >
          <MenuItem>
            <LogoutIcon fontSize="small" className={classes.mr5} />
            <Link
              className={classes.menuLink}
              onClick={Logout}
              to="/login"
              data-testid="logout"
            >
              Cerrar Sesión
            </Link>
          </MenuItem>
        </Menu>
      </Fragment>
    </Navbar>
  );
}
