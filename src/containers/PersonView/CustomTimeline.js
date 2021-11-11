import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import PropTypes from "prop-types";
import { axiosInstance } from "../../config/axios";
import AsignarProyectoPersona from "../AsignarProyectoPersona";
import InfoAsignacion from "../InfoAsignacion";
import {
  rolesFormateados,
  customTimeSteps,
} from "../../config/globalVariables";
import Switcher from "../../components/Switcher/";
import Notificacion from "../../components/Notificacion";
import { Grid } from "@material-ui/core";
import FilterForm from "../../components/FilterForm";
import Typography from "@mui/material/Typography";

PersonTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function PersonTimeline({ onSwitch, isProjectView }) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([true]);
  const [fetchingError, setFetchingError] = useState([false]);
  const [assignObject, setAssignObject] = useState({
    open: false,
    groupId: -1,
    personName: "",
    time: 0,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
  });
  const [filters, setFilters] = useState({
    project_type: "",
    project_state: "",
    organization: "",
  });
  const [infoAssignObject, setInfoAssignObject] = useState({
    open: false,
    asignacionId: -1,
    projectName: "",
    personName: "",
  });

  var groupsToAdd = [];
  var itemsToAdd = [];

  const keys = {
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

  const customTimeSteps = {
    second: 0,
    minute: 0,
    hour: 0,
    day: 1,
    month: 1,
    year: 1,
  };

  // Formato esperado de date : yyyy-MM-DD
  const dateToMiliseconds = (date) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate());
    return moment(newDate).valueOf();
  };

  const startValue = (date) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate());
    return moment(moment(newDate).add(3, "hours")).valueOf();
  };

  const endValue = (date) => {
    if (date) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return moment(moment(newDate).add(3, "hours")).valueOf();
    }
    return moment(Date()).add(5, "years").add(9, "hours").valueOf();
  };

  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchData = async (filterParams = {}) => {
    // to avoid sending empty query params
    for (let key in filterParams) {
      if (filterParams[key] === "" || filterParams[key] === null) {
        delete filterParams[key];
      }
    }

    await axiosInstance
      .get("/person_project", { params: filterParams })
      .then((response) => {
        const rows = response.data.person_project;
        if (rows.length == 0) {
          setFilteredData(false);
        }
        rows.map((ppl) => {
          setFilteredData(true);
          setFetchingError(false);
          const person = ppl.person;
          groupsToAdd.push({
            id: person.id,
            title: person.full_name,
          });
          person.projects.map((proj) => {
            proj.dates.map((dt) => {
              let color = "#B0CFCB";
              var finasignacion = dateToMiliseconds(dt.end_date);
              var hoy = new Date().getTime();
              if (hoy < finasignacion) {
                if (finasignacion - 864000000 < hoy) {
                  //10 dias = 864000000
                  color = "#C14B3A";
                }
              }

              itemsToAdd.push({
                id: dt.id,
                group: person.id,
                start: startValue(dt.start_date),
                end: endValue(dt.end_date),

                canResize: "both",
                canMove: false,
                itemProps: {
                  style: {
                    borderRadius: 5,
                    background: color,
                  },
                },
                title: proj.name + " - " + rolesFormateados[dt.role],
              });
            });
          });
        });
        setGroups(groupsToAdd);
        setItems(itemsToAdd);
      }).catch((error) => {
        setNotify({
          ...notify,
          isOpen: true,
          message: "No se pudieron cargar los datos de las personas",
          type: "error",
        });
        setFetchingError(true);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const defaultTimeStart = moment().startOf("day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(30, "day").toDate();

  const handleItemResize = (itemId, time, edge) => {
    let itemIndex = items.findIndex((itemIter) => itemIter.id == itemId);

    // Cambio en item en la timeline
    let currentItem = items[itemIndex];
    let newItem = {
      ...items[itemIndex],
      start: edge === "left" ? time : items[itemIndex].start,
      end: edge === "left" ? items[itemIndex].end : time,
    };
    setItems(items.map((item) => (item.id == itemId ? newItem : item)));

    // Cambio el item en backend
    let requestBody = {
      role: undefined,
      working_hours: undefined,
      working_hours_type: undefined,
      start_date:
        edge === "left"
          ? moment(time).format("yyyy-MM-DD")
          : moment(items[itemIndex].start).format("yyyy-MM-DD"),
      end_date:
        edge === "left"
          ? moment(items[itemIndex].end - 86400000).format("yyyy-MM-DD") // Le resto 24 horas en milisegundos por el "+ 1" en la linea 88 al traer de backend
          : moment(time - 86400000).format("yyyy-MM-DD"),
    };

    axiosInstance
      .put(`/person_project/${itemId}`, { person_project: requestBody })
      .then()
      .catch((error) => {
        console.error(error.response);
        setItems(items.map((item) => (item.id == itemId ? currentItem : item)));
        if (error.response.status == 400)
          setNotify({
            isOpen: true,
            message:
              error.response.data.errors.start_date ??
              error.response.data.errors.end_date,
            type: "error",
            reload: false,
          });
        else if (error.response.status == 404)
          setNotify({
            isOpen: true,
            message: error.response.data.error,
            type: "error",
            reload: true,
          });
      });
  };

  // Asignacion

  const handleCanvasClick = (groupId, time, e) => {
    let personName = groups.find((group) => group.id == groupId).title;
    setAssignObject({
      open: true,
      groupId: groupId,
      personName: personName,
      time: moment(time + 86400000).format("yyyy-MM-DD"), // Le sumo un dia
    });
  };

  const handleAsignacionClose = () =>
    setAssignObject({ ...assignObject, open: false });

  // Formato esperado de startDate y endDate : yyyy-MM-DD
  const addAsignacion = (asignacionId, personId, title, startDate, endDate) =>
    setItems([
      ...items,
      {
        id: asignacionId,
        group: personId,
        start: startValue(startDate),
        end: endValue(endDate),
        canResize: "both",
        canMove: false,
        title: title,
      },
    ]);

  // Info Asignacion

  const handleItemClick = (itemId, e, time) => {
    let itemObject = items.find((item) => item.id == itemId);
    let projectName = itemObject.title;
    let personName = groups.find((group) => group.id == itemObject.group).title;
    setInfoAssignObject({
      open: true,
      asignacionId: itemId,
      projectName: projectName,
      personName: personName,
    });
  };

  const handleInfoAsignacionClose = () =>
    setInfoAssignObject({ ...infoAssignObject, open: false });

  const removeAsignacion = (asignacionId) =>
    setItems(items.filter((item) => item.id != asignacionId));

  const updateAsignacion = (asignacionId, title, startDate, endDate) =>
    setItems(
      items.map((item) =>
        item.id == asignacionId
          ? {
            ...item,
            start: startValue(startDate),
            end: endValue(endDate),
            title: title,
          }
          : item
      )
    );

  if (isProjectView && !fetchingError) {
    console.log(filteredData);
    return (
      <Fragment>
        <FilterForm
          onSubmit={async (e) => {
            e.preventDefault();
            await fetchData(filters);
          }}
          onClear={async () => {
            setFilters({});
            await fetchData();
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
            itemsSorted
            itemTouchSendsClick={true}
            dragSnap={60 * 60 * 24 * 1000} //dia
            stackItems
            timeSteps={customTimeSteps}
            itemHeightRatio={0.75}
            canMove={true}
            canResize={"both"}
            lineHeight={40}
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            onItemResize={handleItemResize}
            onCanvasClick={handleCanvasClick}
            onItemClick={handleItemClick}
            sidebarWidth={200}
          >
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
        ) : (
          <Notificacion notify={notify} setNotify={setNotify} />
        )}
        {!filteredData && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2vh",
            }}
          >
            <Typography component="h1" variant="h5">
              NO EXISTEN PERSONAS PARA MOSTRAR
            </Typography>
          </div>
        )}
        <AsignarProyectoPersona
          open={assignObject.open}
          personId={parseInt(assignObject.groupId)}
          personName={assignObject.personName}
          onClose={handleAsignacionClose}
          fechaInicio={String(assignObject.time)}
          addAsignacion={addAsignacion}
        />
        <InfoAsignacion
          open={infoAssignObject.open}
          projectName={infoAssignObject.projectName}
          personName={infoAssignObject.personName}
          asignacionId={parseInt(infoAssignObject.asignacionId)}
          onClose={handleInfoAsignacionClose}
          removeAsignacion={removeAsignacion}
          updateAsignacion={updateAsignacion}
        />
        <Notificacion notify={notify} setNotify={setNotify} />
        <Grid container columnSpacing={{ xs: 2 }} style={{ marginLeft: 10 }}>
          <Grid
            item
            style={{
              height: 20,
              width: 20,
              backgroundColor: "#C14B3A",
              border: "1px solid black",
            }}
          ></Grid>
          <Grid item>
            &nbsp;&nbsp;= Asignacion a finalizar en menos de 10 dias.
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  return <Notificacion notify={notify} setNotify={setNotify} />;
}
