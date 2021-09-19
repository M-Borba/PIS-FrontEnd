import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useStyles } from "./styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NOT_LOGGED } from "../../config/globalVariables";
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

  const handleClick = (event) => {
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit">
              <Link className={classes.link} to="/inicio">
                Inicio
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/">
                Proyectos
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/personas">
                Personas
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/">
                Administradores
              </Link>
            </Button>
          </Typography>
          <Fragment>
            <Tooltip title="Account settings">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ textDecoration: "none" }}
                data-testid="menu-perfil"
              >
                <AccountCircleIcon style={{ marginRight: 5 }} />
                {username}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
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
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              style={{ marginTop: 48 }}
            >
              <MenuItem>
                <AccountCircleIcon style={{ marginRight: 5 }} /> Mi Perfil
              </MenuItem>
              <Divider />
              <MenuItem>
                <LogoutIcon fontSize="small" style={{ marginRight: 5 }} />
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
