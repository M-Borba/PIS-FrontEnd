import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { IconButton, Box, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TodayMarker,
} from "react-calendar-timeline";
import randomColor from "randomcolor";
import { useSnackbar } from "notistack";
import { Paper } from "@mui/material";

import "./style.css";
import { useStyles } from "./styles";
import { axiosInstance } from "../../config/axios";
import Switcher from "../../components/Switcher/";
import { customTimeSteps } from "../../config/globalVariables";
import InfoProyecto from "../../containers/InfoProyecto";
import FilterForm from "../../components/FilterForm";
import not_found from "../../resources/not_found.png";
import { startValue, endValue } from "../PersonView/CustomTimeline";
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

const ProjectTimeline = ({ onSwitch, isProjectView }) => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [openInfo, setOpenInfo] = React.useState(false);
  const [filteredData, setFilteredData] = useState([true]);
  const [displayToday, setDisplayToday] = useState(false);
  const [fetchingError, setFetchingError] = useState([false]);
  const [filters, setFilters] = useState({
    project_type: "",
    project_state: "",
  });
  const [isLoading, setIsLoading] = useState();
  const [organization, setOrganization] = useState("");

  const defaultTimeStart = moment()
    .startOf("day")
    .subtract(6, "month")
    .toDate();
  const defaultTimeEnd = moment().startOf("day").add(7, "month").toDate();

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

    await axiosInstance
      .get("/projects", { params: filterParams })
      .then((response) => {
        const rows = response.data.projects;
        if (rows.length == 0) {
          if (Object.keys(filterParams).length === 0) {
            setFetchingError(true);
          } else {
            setFetchingError(false);
            setFilteredData(false);
          }
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
            case "upcoming":
              color = "#B0CFCB";
              break;
          }
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
                background: color,
                border: "none",
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

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const handleItemClick = async (itemId) => {
    axiosInstance.get("/projects/" + itemId).then((response) => {
      var data = response.data.project;
      setProjectData(data);
      setOpenInfo(true);
    });
  };

  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
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
              dragSnap={60 * 60 * 24 * 1000} //dia
              itemHeightRatio={0.75}
              canMove={true} //se pueden mover
              canChangeGroup={false} //no se pueden "cambiar de renglon"
              canResize={"both"}
              defaultTimeStart={defaultTimeStart}
              defaultTimeEnd={defaultTimeEnd}
              timeSteps={customTimeSteps}
              onItemClick={handleItemClick}
              onItemSelect={handleItemClick}
              sidebarWidth={210}
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
              <img
                style={{ marginTop: "30px" }}
                className={classes.imgcontainer}
                src={not_found}
              />
              <Typography variant="h4" style={{ marginTop: "30px" }}>
                NO EXISTEN PROYECTOS PARA MOSTRAR
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
                projectData={projectData}
                type={projectData.project_type
                  ?.replaceAll("_", " ")
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                state={projectData.project_state?.replace(/^\w/, (m) =>
                  m.toUpperCase()
                )}
              />
            </Paper>
          </Modal>
        </Fragment>
      ) : (
        fetchingError &&
        !isProjectView && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              style={{ marginTop: "15%" }}
              className={classes.imgcontainer}
              src={not_found}
            />
            <Typography variant="h4" style={{ marginTop: "30px" }}>
              AÚN NO EXISTEN PROYECTOS EN EL SISTEMA
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
};

export default ProjectTimeline;
