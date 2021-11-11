import React, { useState, Fragment, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import BellIcon from 'react-bell-icon';
import MenuItem from "@material-ui/core/MenuItem";
import boopSfx from '../../resources/sounds/notification.mp3'
import Menu from "@material-ui/core/Menu";
import { useStyles, PaperProps, anchorElPoint } from "./styles";
import moment from 'moment';
import useSound from 'use-sound';
import {
  ActionCableProvider,
  ActionCableConsumer,
} from 'react-actioncable-provider';
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from "@material-ui/core/Toolbar";
import { axiosInstance } from "../../config/axios";
import { Tooltip } from "@material-ui/core";

export default function Header() {
  const wrapperRef = useRef(null);
  const [play] = useSound(boopSfx);
  const [hasNotification, setHasNotification] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false)
  const [notifications, setNotifications] = useState([]);
  let uid = localStorage.getItem('uid');
  if (uid == null) {
    uid = "Aún no inició sesión";
  }
  const classes = useStyles();
  const [username] = useState(uid);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  useEffect(() => {
    if (hasNotification) {
      setTimeout(() => {
        setHasNotification(false)
      }, 3000);
    }
  }, [hasNotification]);

  const handleClickOutside = () => {
    setShowNotificationCenter(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

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

  const fetchNotifications = () => {
    axiosInstance
      .get("/notifications")
      .then((response) => {
        setNotifications(response.data?.notifications || [])
        setShowNotificationCenter(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // FIXME: CAMBIAR PARA PROD
  const LOCAL_HOST_URL = "ws://localhost:3000/cable?";

  const buildMessage = (n) => {
    const m = moment(n.end_date);
    const today = moment().startOf('day');
    const days = Math.round(moment.duration(today - m).asDays());
    if (n.alert_type === "project") {
      return `El proyecto ${n.name} finalizara el ${Math.abs(days)} dias`
    }
    return `La persona ${n.name} quedara libre el ${Math.abs(days)} dias`
  }

  return (
    <div className={classes.root}>
      <ActionCableProvider
        url={`${LOCAL_HOST_URL}token=${localStorage.getItem(
          'token'
        )}&uid=${localStorage.getItem('uid')}&client=${localStorage.getItem(
          'client'
        )}`}
      >
        <AppBar position="static">
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
              <ActionCableConsumer
                channel={{ channel: 'WebChannel' }}
                onReceived={() => {
                  console.log('Recived')
                  play();
                  setHasNotification(true);
                }}
              />
              <div style={{ marginRight: 10 }} onClick={fetchNotifications}>
                <BellIcon style={{ cursor: 'pointer' }} width='20' color="#fff" active={hasNotification} animate={hasNotification} />
                {showNotificationCenter && (<List
                  className={classes.notification}
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Notificaciones
                    </ListSubheader>
                  }
                >
                  {notifications.map(n => (
                    <ListItem key={n.id} button>
                      <ListItemText className={classes.item} primary={buildMessage(n)} />
                    </ListItem>
                  ))}
                </List>)}
              </div>
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
      </ActionCableProvider>
    </div>
  );
}
