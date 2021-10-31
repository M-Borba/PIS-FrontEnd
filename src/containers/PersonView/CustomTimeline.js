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

PersonTimeline.propTypes = {
  onSwitch: PropTypes.func,
  isProjectView: PropTypes.bool,
};

export default function PersonTimeline({ onSwitch, isProjectView }) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [assignObject, setAssignObject] = useState({
    open: false,
    groupId: -1,
    personName: "",
    time: 0,
  });
  const [infoAssignObject, setInfoAssignObject] = useState({
    open: false,
    asignacionId: -1,
    projectName: "",
    personName: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
    reload: false,
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

  const fetchData = () => {
    axiosInstance.get("/person_project").then((response) => {
      const rows = response.data.person_project;
      rows.map((ppl) => {
        var person = ppl.person;

        groupsToAdd.push({
          id: person.id,
          title: person.full_name,
        });

        person.projects.map((proj) => {
          proj.dates.map((dt) => {
            var startDate = new Date(dt.start_date);
            startDate.setDate(startDate.getDate());

            const startValue = moment(startDate).valueOf();

            var endDate = new Date(dt.end_date);
            endDate.setDate(endDate.getDate() + 1);

            var endValue = moment(endDate).valueOf();

            if (!dt.end_date) {
              endDate = new Date(1, 1, 2050);
              endValue = moment(endDate).valueOf();
            }

            itemsToAdd.push({
              id: dt.id,
              group: person.id,
              start: startValue + 10800000, // le sumo 3 horas en milisegundos para que se ajuste a las lineas de los dias
              end: endValue + 10800000,
              canResize: "both",
              canMove: false,
              title: proj.name + " - " + rolesFormateados[dt.role],
            });
          });
        });
      });

      setGroups(groupsToAdd);
      setItems(itemsToAdd);
    });
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
          : moment(time - 86400000).format("yyyy-MM-DD"),
    };

    axiosInstance
      .put(`/person_project/${itemId}`, { person_project: requestBody })
      .then()
      .catch((error) => {
        console.log(error.response);
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
        setItems(items.map((item) => (item.id == itemId ? currentItem : item)));
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

  if (groups.length > 0 && isProjectView) {
    return (
      <Fragment>
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
        <AsignarProyectoPersona
          open={assignObject.open}
          personId={parseInt(assignObject.groupId)}
          personName={assignObject.personName}
          onClose={handleAsignacionClose}
          fechaInicio={String(assignObject.time)}
        />
        <InfoAsignacion
          open={infoAssignObject.open}
          projectName={infoAssignObject.projectName}
          personName={infoAssignObject.personName}
          asignacionId={parseInt(infoAssignObject.asignacionId)}
          onClose={handleInfoAsignacionClose}
        />
        <Notificacion notify={notify} setNotify={setNotify} />
      </Fragment>
    );
  }
  return null;
}
