import React, { Fragment, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { Avatar } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

import { anchorElPoint, Navbar, PaperProps, useStyles } from "./styles";
import { axiosInstance } from "../../config/axios";

import AdministratorsIcon from "../../assets/icons/AdministratorsIcon.svg";
import HomeIcon from "../../assets/icons/HomeIcon.svg";
import PersonsIcon from "../../assets/icons/PersonsIcon.svg";
import ProjectsIcon from "../../assets/icons/ProjectsIcon.svg";
import logoEFFE from "../../assets/icons/logoEFFE.svg";
import EFFElogoname from "../../assets/icons/EFFElogoname.svg";
import { LinkButton } from "./LinkButton";
import { HEADER_LABELS } from "../../config/globalVariables";

export default function Header() {
  var uid = localStorage.getItem("uid");
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const classes = useStyles();
  const [username] = useState(uid);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const selectedTab = window.location.pathname;
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
        <LinkButton
          title={HEADER_LABELS.INICIO}
          src={HomeIcon}
          alt={HEADER_LABELS.INICIO}
          to="/inicio"
          isSelected={"/inicio" === selectedTab}
        />
        <LinkButton
          title={HEADER_LABELS.PROYECTOS}
          src={ProjectsIcon}
          alt={HEADER_LABELS.PROYECTOS}
          to="/proyectos"
          isSelected={"/proyectos" === selectedTab}
        />
        <LinkButton
          title={HEADER_LABELS.PERSONAS}
          src={PersonsIcon}
          alt={HEADER_LABELS.PERSONAS}
          to="/personas"
          isSelected={"/personas" === selectedTab}
        />
        <LinkButton
          title={HEADER_LABELS.ADMINS}
          src={AdministratorsIcon}
          alt={HEADER_LABELS.ADMINS}
          to="/administradores"
          isSelected={"/administradores" === selectedTab}
        />
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
        <Tooltip title={HEADER_LABELS.CONFIGURACION_DE_CUENTA}>
          <div className={classes.userName} onClick={handleMenu}>
            <Avatar className={classes.userNameIcon}>
              <PersonIcon />
            </Avatar>
            {username.split("@")[0]}
          </div>
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
              {HEADER_LABELS.CERRAR_SESION}
            </Link>
          </MenuItem>
        </Menu>
      </Fragment>
    </Navbar>
  );
}
