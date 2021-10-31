import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { IconButton, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import randomColor from "randomcolor";
import { axiosInstance } from "../../config/axios";
import Switcher from "../../components/Switcher/";
import PropTypes from "prop-types";
import "./style.css";
import { useStyles } from "./styles";

import InfoProyecto from "../../containers/InfoProyecto";
import Notificacion from "../../components/Notificacion";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

ProjectTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function ProjectTimeline({ onSwitch, isProjectView }) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [openInfo, setOpenInfo] = React.useState(false);

  const classes = useStyles();

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  var groupsToAdd = [];
  var itemsToAdd = [];
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const customTimeSteps = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 1,
    month: 1,
    year: 1,
  };

  const fetchData = async () => {
    axiosInstance
      .get("/projects")
      .then((response) => {
        const rows = response.data.projects;
        rows.map((proj) => {
          groupsToAdd.push({
            id: proj.id,
            title: proj.name,
            bgColor: randomColor({ luminosity: "light" }),
          });
          setGroups(groupsToAdd);
          const startDate = new Date(proj.start_date);
          const startValue = moment(startDate).valueOf();
          const endDate = new Date(proj.end_date);
          const endValue = moment(endDate).valueOf();
          itemsToAdd.push({
            id: proj.id,
            group: proj.id,
            start: startValue,
            end: endValue,
            canMove: startValue > new Date().getTime(),
            canResize: "both",
            className:
              moment(startDate).day() === 6 || moment(startDate).day() === 0
                ? "item-weekend"
                : "",
          });
        });
        setItems(itemsToAdd);
      })
      .catch((error) =>
        setNotify({
          ...notify,
          isOpen: true,
          message: "No se pudieron cargar los datos de los proyectos",
          type: "error",
        })
      );
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = async (itemId) => {
    axiosInstance.get("/projects/" + itemId).then((response) => {
      var data = response.data.project;
      setProjectData(data);
      setOpenInfo(true);
    });
  };

  const defaultTimeStart = moment().startOf("day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(30, "day").toDate();

  if (groups.length > 0 && items.length > 0 && !isProjectView) {
    return (
      <Fragment>
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          fullUpdate
          itemTouchSendsClick={true}
          dragSnap={60 * 60 * 24 * 1000} //dia
          itemHeightRatio={0.75}
          canMove={true} //se pueden mover
          canChangeGroup={false} //no se pueden "cambiar de renglon"
          canResize={"both"}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          timeSteps={customTimeSteps}
          onItemClick={handleItemClick}
          sidebarWidth={200}
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader style={{}}>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()}>
                    <Switcher
                      onSwitch={onSwitch}
                      isProjectView={isProjectView}
                    />
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>

        <Modal open={openInfo} onClose={handleInfoClose} disableEnforceFocus>
          <Box className={classes.modalInfo}>
            <IconButton
              aria-label="Close"
              onClick={handleInfoClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <InfoProyecto
              projectData={projectData}
              type={projectData.project_type}
              state={projectData.project_state}
            />
          </Box>
        </Modal>
      </Fragment>
    );
  }
  return <Notificacion notify={notify} setNotify={setNotify} />;
}
