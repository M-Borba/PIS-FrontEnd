import React, { useState, useEffect } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import { axiosInstance } from "../../config/axios";

export default function PersonTimeline() {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

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

  const fetchData = () => {
    return axiosInstance.get("/person_project").then((response) => {
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
            startDate.setDate(startDate.getDate() + 1);

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
              start: startValue,
              end: endValue,
              canResize: "both",
              canMove: false,
              title: proj.name + " - " + dt.role,
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
  const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

  const handleItemResize = ({ itemId, time, edge }) => {
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

  if (groups.length > 0 && items.length > 0) {
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        canResize="right"
        itemsSorted
        itemTouchSendsClick={true}
        dragSnap={60 * 60 * 24 * 1000} //dia
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        lineHeight={40}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemResize={handleItemResize}
      />
    );
  }
  return null;
}
