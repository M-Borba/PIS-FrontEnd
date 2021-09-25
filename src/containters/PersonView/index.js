import React, { Component } from "react";
import moment from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";

import Switcher from "../../components/Switcher/index";
import PropTypes from "prop-types";
import "react-calendar-timeline/lib/Timeline.css";

import generateFakeData from "./generate-fake-data";

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

const customTimeSteps = {
  second: 0,
  minute: 0,
  hour: 0,
  day: 1,
  month: 1,
  year: 1,
};

export default class PersonTimeline extends Component {
  constructor(props) {
    super(props);

    const { groups, items } = generateFakeData();
    const defaultTimeStart = moment().startOf("month").toDate();
    const defaultTimeEnd = moment().startOf("month").add(1, "day").toDate();

    this.handleItemMove = this.handleItemMove.bind(this);

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
  };

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
  };

  render() {
    if (this.props.isProjectView) {
      const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;
      return (
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          fullUpdate
          itemTouchSendsClick={true}
          dragSnap={60 * 60 * 24 * 1000} //dia
          timeSteps={customTimeSteps}
          stackItems
          itemHeightRatio={0.75}
          canMove={true}
          canResize={"both"}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          sidebarWidth={200}
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()}>
                    <Switcher
                      onSwitch={this.props.onSwitch}
                      isProjectView={this.props.isProjectView}
                    />
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      );
    } else {
      return null;
    }
  }
}

PersonTimeline.propTypes = {
  isProjectView: PropTypes.bool,
  onSwitch: PropTypes.func,
};
