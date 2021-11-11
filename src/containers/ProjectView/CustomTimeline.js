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
import FilterForm from "../../components/FilterForm";
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
  const [filteredData, setFilteredData] = useState([true]);
  const [fetchingError, setFetchingError] = useState([false]);
  const [filters, setFilters] = useState({
    project_type: "",
    project_state: "",
    organization: "",
  });

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

  const fetchData = (filterParams = {}) => {
    // to avoid sending empty query params
    for (let key in filterParams) {
      if (filterParams[key] === "" || filterParams[key] === null) {
        delete filterParams[key];
      }
    }
    axiosInstance
      .get("/projects", { params: filterParams })
      .then((response) => {
        const rows = response.data.projects;
        if (rows.length == 0) {
          setFilteredData(false);
          setNotify({
            ...notify,
            isOpen: true,
            message: "No existen datos para los filtros seleccionados",
            type: "error",
          });
        }
        rows.map((proj) => {
          setFilteredData(true);
          setFetchingError(false);

          groupsToAdd.push({
            id: proj.id,
            title: proj.name,
            bgColor: randomColor({ luminosity: "light" }),
          });
          setGroups(groupsToAdd);
          const startDate = new Date(proj.start_date);
          const startValue = moment(startDate).valueOf();
          const endDate = !proj.end_date
            ? new Date(2050, 1, 1)
            : new Date(proj.end_date);
          const endValue = moment(endDate).valueOf();
          let color = "";
          switch (proj.project_state) {
            case "verde":
              color = "#7ede6d";
              break;
            case "rojo":
              color = "#E87272";
              break;
            case "amarillo":
              color = "#FAE269";
              break;
            case "upcomping":
              color = "#B0CFCB";
              break;
          }
          itemsToAdd.push({
            id: proj.id,
            group: proj.id,
            start: startValue,
            end: endValue,
            canMove: startValue > new Date().getTime(),
            canResize: "both",
            itemProps: {
              style: {
                borderRadius: 5,
                background: color,
              },
            },
            className:
              moment(startDate).day() === 6 || moment(startDate).day() === 0
                ? "item-weekend"
                : "",
          });
        });
        setItems(itemsToAdd);
      })
      .catch((error) => {
        setNotify({
          ...notify,
          isOpen: true,
          message: "No se pudieron cargar los datos de los proyectos",
          type: "error",
        });
        setFetchingError(true);
      });
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

  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };
  if (!isProjectView && !fetchingError) {
    return (
      <Fragment>
        <FilterForm
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(filters);
          }}
          onClear={() => {
            setFilters({});
            fetchData();
          }}
          onInputChange={onFilterChange}
          project_state={filters.project_state}
          project_type={filters.project_type}
          organization={filters.organization}
        />
        {filteredData ? (
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
        ) : (
          <Notificacion notify={notify} setNotify={setNotify} />
        )}
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
