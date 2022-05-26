import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { Box, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TodayMarker,
} from "react-calendar-timeline";
import randomColor from "randomcolor";
import { useSnackbar } from "notistack";
import { Paper } from "@mui/material";

import "./style.css";
import { useStyles } from "./styles";
import { axiosInstance } from "../../config/axios";
import Switcher from "../../components/Switcher/";
import {
  COLORS,
  customTimeSteps,
  PROJECT_LABELS,
  PROJECT_STATE_VALUES,
} from "../../config/globalVariables";
import InfoProyecto from "../../containers/InfoProyecto";
import FilterForm from "../../components/FilterForm";
import not_found from "../../resources/not_found.png";
import { endValue, startValue } from "../PersonView/CustomTimeline";
import Loading from "../../components/Loading";

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

const ProjectTimeline = ({
  onSwitch,
  isProjectView,
  filters,
  setFilters,
  organization,
  setOrganization,
}) => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [openInfo, setOpenInfo] = React.useState(false);
  const [filteredData, setFilteredData] = useState([true]);
  const [displayToday, setDisplayToday] = useState(false);
  const [fetchingError, setFetchingError] = useState([false]);
  const [isLoading, setIsLoading] = useState();

  const getStateColor = (state) => {
    let color = "";
    switch (state) {
      case PROJECT_STATE_VALUES.VERDE:
        color = COLORS.stateGreen;
        break;
      case PROJECT_STATE_VALUES.ROJO:
        color = COLORS.stateRed;
        break;
      case PROJECT_STATE_VALUES.AMARILLO:
        color = COLORS.stateYellow;
        break;
      case PROJECT_STATE_VALUES.UPCOMING:
        color = COLORS.stateUpcoming;
        break;
    }
    return color;
  };

  const defaultTimeStart = moment()
    .startOf("day")
    .subtract(6, "month")
    .toDate();
  const defaultTimeEnd = moment().startOf("day").add(7, "month").toDate();

  const today = moment().startOf("day").toDate();

  const classes = useStyles();

  var groupsToAdd = [];
  var itemsToAdd = [];

  const fetchData = async (filterParams = {}) => {
    setIsLoading(true);
    // to avoid sending empty query params
    for (let key in filterParams) {
      if (filterParams[key] === "" || filterParams[key] === null) {
        delete filterParams[key];
      }
    }

    // const active_project = filterParams.active_project || false;
    // delete filterParams.active_project;

    await axiosInstance
      .get("/projects", { params: filterParams })
      .then((response) => {
        let rows = response.data.projects;
        if (rows.length === 0) {
          if (Object.keys(filterParams).length === 0) {
            setFetchingError(true);
          } else {
            setFetchingError(false);
            setFilteredData(false);
          }
        }
        // rows = rows.filter((row) => {
        //   if (active_project) {
        //     return true;
        //   } else {
        //     return endValue(row.end_date) >= today;
        //   }
        // });
        rows.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
        rows.map((proj) => {
          setFilteredData(true);
          setFetchingError(false);

          groupsToAdd.push({
            id: proj.id,
            title: proj.name,
            bgColor: randomColor({ luminosity: "light" }),
          });

          setGroups(groupsToAdd);

          itemsToAdd.push({
            id: proj.id,
            group: proj.id,
            start: startValue(proj.start_date),
            end: endValue(proj.end_date),
            canMove: startValue(proj.start_date) > new Date().getTime(),
            canResize: false,
            itemProps: {
              style: {
                borderRadius: 5,
                background: getStateColor(proj.project_state),
                border: "none",
                height: "20px",
              },
            },
            className:
              moment(proj.start_date).day() === 6 ||
              moment(proj.start_date).day() === 0
                ? "item-weekend"
                : "",
          });
        });
        setItems(itemsToAdd);
      })
      .catch((error) => {
        console.error(error.response);
        enqueueSnackbar("No se pudieron cargar los datos de los proyectos.", {
          variant: "error",
          autoHideDuration: 8000,
        });
        setFetchingError(true);
      });
    setIsLoading(false);
  };

  const updateProjectState = (projectData) => {
    setItems(
      items.map((item) => {
        if (item.id === projectData.id) {
          return {
            ...item,
            itemProps: {
              style: {
                borderRadius: 5,
                background: getStateColor(projectData.project_state),
                border: "none",
                height: "20px",
              },
            },
          };
        }
        return item;
      })
    );
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const handleItemClick = async (itemId) => {
    axiosInstance.get("/projects/" + itemId).then((response) => {
      const data = response.data.project;
      setProjectData(data);
      setOpenInfo(true);
    });
  };

  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value || e.target.checked,
    }));
  };

  useEffect(() => {
    filters ? fetchData({ ...filters, organization }) : fetchData();
  }, [filters]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : groups.length > 0 && !isProjectView && !fetchingError ? (
        <Fragment>
          <FilterForm
            onClear={async () => {
              setFilters({});
              setOrganization("");
              await fetchData();
            }}
            onInputChange={onFilterChange}
            project_state={filters.project_state}
            project_type={filters.project_type}
            active_project={filters.active_project}
            organization={organization}
            onOrganizationChange={(e) => setOrganization(e.target.value)}
            onSearch={() => fetchData({ ...filters, organization })}
            setToday={() => {
              setDisplayToday(true);
              setTimeout(() => setDisplayToday(false), [100]);
            }}
          />
          {filteredData && (
            <Timeline
              groups={groups}
              items={items}
              keys={keys}
              fullUpdate
              itemTouchSendsClick={true}
              minZoom={30.4368498333 * 86400 * 1000} // mes
              maxZoom={2 * 365.242198 * 86400 * 1000} // 2 años
              dragSnap={60 * 60 * 24 * 1000} //dia
              itemHeightRatio={0.75}
              canMove={true} //se pueden mover
              canChangeGroup={false} //no se pueden "cambiar de renglón"
              canResize={"both"}
              lineHeight={40}
              defaultTimeStart={defaultTimeStart}
              defaultTimeEnd={defaultTimeEnd}
              timeSteps={customTimeSteps}
              onItemClick={handleItemClick}
              onItemSelect={handleItemClick}
              sidebarWidth={250}
              visibleTimeStart={displayToday && defaultTimeStart}
              visibleTimeEnd={displayToday && defaultTimeEnd}
            >
              <TodayMarker />
              <TimelineHeaders className="sticky">
                <SidebarHeader>
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
          )}
          {!filteredData && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <img style={{ marginTop: "30px" }} src={not_found} />
              <Typography variant="h4" style={{ marginTop: "30px" }}>
                {PROJECT_LABELS.NO_EXISTEN_PROYECTOS_PARA_MOSTRAR}
              </Typography>
            </Box>
          )}
          <Modal open={openInfo} onClose={handleInfoClose} disableEnforceFocus>
            <Paper
              className={classes.modalInfo}
              variant="elevation"
              elevation={3}
            >
              <IconButton
                aria-label="Close"
                onClick={handleInfoClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
              <InfoProyecto
                updateProjectState={updateProjectState}
                onClose={handleInfoClose}
                projectData={projectData}
                type={projectData.project_type
                  ?.replaceAll("_", " ")
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              />
            </Paper>
          </Modal>
        </Fragment>
      ) : (
        fetchingError &&
        !isProjectView && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <img style={{ marginTop: "15%" }} src={not_found} />
            <Typography variant="h4" style={{ marginTop: "30px" }}>
              {PROJECT_LABELS.NO_EXISTEN_PROYECTOS_AUN}
            </Typography>
          </Box>
        )
      )}
    </>
  );
};

ProjectTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  organization: PropTypes.string,
  setOrganization: PropTypes.func,
};

export default ProjectTimeline;
