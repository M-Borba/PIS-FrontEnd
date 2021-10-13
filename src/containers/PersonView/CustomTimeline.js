import React, { Component, Fragment } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import generateFakeData from "./generate-fake-data";
import Dialog from "@mui/material/Dialog";
import AsignarProyectoPersona from "../AsignarProyectoPersona";
import InfoAsignacion from "../InfoAsignacion";

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

export default class PersonTimeline extends Component {
  constructor(props) {
    super(props);
    this.handleItemMove = this.handleItemMove.bind(this);
    this.handleItemResize = this.handleItemResize.bind(this);
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.handleAsignacionClose = this.handleAsignacionClose.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleInfoPoryectoClose = this.handleInfoPoryectoClose.bind(this);

    const { groups, items } = generateFakeData();
    const defaultTimeStart = new Date(1630540800000);
    // const defaultTimeStart = moment().startOf("day").toDate();
    const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      // Canvas Click
      openAsignacionDialog: false,
      groupId: -1,
      personName: "",
      // Item Click
      openInfoProyectoTiemline: false,
      itemId: -1,
    };
  }

  handleItemMove(itemId, dragTime, newGroupOrder) {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item
      ),
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  }

  handleItemResize(itemId, time, edge) {
    const { items } = this.state;

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time,
            })
          : item
      ),
    });

    console.log("Resized", itemId, time, edge);
  }

  // Asignacion Dialog

  handleCanvasClick(groupId, time, e) {
    let personName = this.state.groups[groupId - 1].title;
    this.setState({
      ...this.state,
      openAsignacionDialog: true,
      groupId: groupId,
      personName: personName,
    });
  }

  handleAsignacionClose() {
    this.setState({ ...this.state, openAsignacionDialog: false });
  }

  // Infor Proyecto Dialog

  handleItemClick(itemId, e, time) {
    let groupId = this.state.items[itemId].group;
    this.setState({
      ...this.state,
      openInfoProyectoTiemline: true,
      itemId: itemId,
      groupId: groupId,
    });
  }

  handleInfoPoryectoClose() {
    this.setState({ ...this.state, openInfoProyectoTiemline: false });
  }

  render() {
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      openAsignacionDialog,
      groupId,
      personName,
      openInfoProyectoTiemline,
      itemId,
    } = this.state;

    return (
      <Fragment>
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          fullUpdate
          itemTouchSendsClick={true}
          dragSnap={60 * 60 * 24 * 1000} //dia
          stackItems
          itemHeightRatio={0.75}
          canMove={true}
          canResize={"both"}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onCanvasClick={this.handleCanvasClick}
          onItemClick={this.handleItemClick}
        />
        <Dialog
          open={openAsignacionDialog}
          onClose={this.handleAsignacionClose}
        >
          <AsignarProyectoPersona
            personId={parseInt(groupId)}
            personName={personName}
            onClose={this.handleAsignacionClose}
          />
        </Dialog>
        <Dialog
          open={openInfoProyectoTiemline}
          onClose={this.handleInfoPoryectoClose}
          maxWidth="md"
          fullWidth={true}
        >
          <InfoAsignacion
            projectId={parseInt(itemId)}
            personId={parseInt(groupId)}
            onClose={this.handleInfoPoryectoClose}
          />
        </Dialog>
      </Fragment>
    );
  }
}
