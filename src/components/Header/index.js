import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useStyles, PaperProps, anchorElPoint } from "./styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { axiosInstance } from "../../config/axios";
import { Tooltip } from "@material-ui/core";

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
    <div className={classes.root}>
      <AppBar style={{ background: '#1c1c1c' }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link className={classes.link} to="/inicio">
                Inicio
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/proyectos">
                Proyectos
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/personas">
                Personas
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/administradores">
                Administradores
              </Link>
            </Button>
          </Typography>
          <Fragment>
            <Tooltip title="Configuración de la cuenta">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                data-testid="menu-perfil"
              >
                <AccountCircleIcon className={classes.mr5} />
                {username}
              </IconButton>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
