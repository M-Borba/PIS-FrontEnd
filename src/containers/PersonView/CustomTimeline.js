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
import { rolesFormateados } from "../../config/globalVariables";
import Switcher from "../../components/Switcher/";
import Notificacion from "../../components/Notificacion";
import FilterForm from "../../components/FilterForm";

PersonTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function PersonTimeline({ onSwitch, isProjectView }) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([true]);
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
  const onFilterChange = (e) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchData = (filterParams = {}) => {
    // to avoid sending empty query params
    for (let key in filterParams) {
      if (filterParams[key] === "" || filterParams[key] === null) {
        delete filterParams[key];
      }
    }

    axiosInstance
      .get("/person_project", { params: filterParams })
      .then((response) => {
        const rows = response.data.person_project;
        if (rows.length == 0) {
          setFilteredData(false);
          setNotify({
            ...notify,
            isOpen: true,
            message: "No existen datos para los filtros seleccionados",
            type: "error",
          })
        }
        rows.map((ppl) => {
          setFilteredData(true);
          const person = ppl.person;
          groupsToAdd.push({
            id: person.id,
            title: person.full_name,
          });

          person.projects.map((proj) => {
            proj.dates.map((dt) => {
              let startDate = new Date(dt.start_date);
              startDate.setDate(startDate.getDate());

              const startValue = moment(
                moment(startDate).add(3, "hours")
              ).valueOf();

              let endDate = new Date(dt.end_date);
              endDate.setDate(endDate.getDate() + 1);

              let endValue = moment(endDate).valueOf();

              if (!dt.end_date) {
                endDate = moment(Date()).add(5, "years");
                endValue = moment(moment(endDate).add(3, "hours")).valueOf(); // le sumo 3 horas en milisegundos para que se ajuste a las lineas de los dias
              }

              itemsToAdd.push({
                id: dt.id,
                group: person.id,
                start: startValue,
                end: endValue,
                canResize: "both",
                canMove: false,
                title: proj.name + " - " + rolesFormateados[dt.role],
              });
            });
          });
        });
      });

    setGroups(groupsToAdd);
    setItems(itemsToAdd);
  };


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
          : moment(time - 86400000).format("yyyy-MM-DD"), // Le resto 24 horas en milisegundos
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
        start: dateToMiliseconds(startDate) + 10800000, // le sumo 3 horas en milisegundos para que se ajuste a las lineas de los dias
        end: dateToMiliseconds(endDate) + 97200000, // le sumo un dia y 3 horas
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
            start: dateToMiliseconds(startDate) + 10800000,
            end: dateToMiliseconds(endDate ?? "2100-01-01") + 97200000,
            title: title,
          }
          : item
      )
    );

  if (groups.length > 0 && isProjectView) {
    return (
      <Fragment>
        <FilterForm
          onSunmit={() => console.log("call al backend para ver projectos")}
        />
        {filteredData ?
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
          : <Notificacion notify={notify} setNotify={setNotify} />}
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
      </Fragment>
    );
  }
  return null;
}
