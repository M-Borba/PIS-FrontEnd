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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from "@material-ui/core/Toolbar";
import { axiosInstance } from "../../config/axios";
import { Tooltip } from "@material-ui/core";

export default function Header() {
  const wrapperRef = useRef(null);
  const [play] = useSound(boopSfx);
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCenter, setNotificationCenter] = useState(null)
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

  const handleOpenNotification = (e) => {
    setNotificationCenter(e.currentTarget)
    axiosInstance
      .get("/notifications")
      .then((response) => {
        setNotifications(response.data?.notifications || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (n) => {
    const { alert_type, id } = n;
    axiosInstance
      .put(`/notifications/${id}`, { alert_type })
      .then(() => {
        const noti = notifications.filter(n => n.id !== id);
        setNotifications(noti);
        if (!noti.length) {
          setNotificationCenter(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // FIXME: CAMBIAR PARA PROD
  const LOCAL_HOST_URL = "ws://localhost:3000/cable?";

  const buildMessage = (n) => {
    const m = moment(n.end_date);
    console.log(n)
    const today = moment().startOf('day');
    const days = Math.round(moment.duration(m - today).asDays());
    let daysFormatted = '';
    if (days > 0) {
      const type = n.alert_type === "project" ? 'finaliza dentro' : 'quedara libre en';
      daysFormatted = `${type} ${Math.abs(days)} dias`;
    }
    if (days < 0) {
      const type = n.alert_type === "project" ? 'finalizó hace' : 'quedó libre hace';
      daysFormatted = `${type} ${Math.abs(days)} dias`;
    }
    if (days === 0) {
      const type = n.alert_type === "project" ? 'finaliza' : 'queda libre';
      daysFormatted = `${type} ${Math.abs(days)} Hoy!`;
    }
    if (n.alert_type === "project") {
      return `El proyecto ${n.name} ${daysFormatted}`
    }
    return `La persona ${n.name} ${daysFormatted}`
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
                onReceived={async () => {
                  await play();
                  setHasNotification(true);
                }}
              />
              <div style={{ marginRight: 10 }} onClick={handleOpenNotification} aria-controls="notification-menu" aria-haspopup="true">
                <BellIcon style={{ cursor: 'pointer' }} width='20' color="#fff" active={hasNotification} animate={hasNotification} />
              </div>
              <Menu
                id="notification-menu"
                anchorEl={notificationCenter}
                keepMounted
                className={classes.notification}
                open={Boolean(notificationCenter)}
                onClose={() => setNotificationCenter(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}

                elevation={0}
                getContentAnchorEl={null}
              >
                <MenuItem style={{ height: 40 }} disabled>
                  <ListItemText style={{ marginRight: 20 }} className={classes.item} primary="Notificaciones" />
                </MenuItem>
                {notifications.map(n => (
                  <MenuItem key={n.id} style={{ height: 70 }}>
                    <ListItemText style={{ marginRight: 20 }} className={classes.item} primary={buildMessage(n)} />
                    <ListItemSecondaryAction onClick={() => handleDelete(n)}>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </MenuItem>
                ))}
              </Menu>
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
