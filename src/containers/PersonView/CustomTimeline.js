import React, { Component } from "react";
import moment from "moment";

import Timeline from "react-calendar-timeline";

import getTimelineData from "./getTimelineData";
// import 'react-calendar-timeline/lib/Timeline.css';

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

    // const { groups, items } = generateFakeData();
    const defaultTimeStart = moment().startOf("day").toDate();
    const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

    const { groups, items } = getTimelineData();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
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

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
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
      />
    );
  }
}

