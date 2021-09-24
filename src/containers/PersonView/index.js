/**
 * Person View
 *
 * This is the container that has all actions and components related
 * to de Person View, were we manage our staff.
 *
 */

import React, { Component } from "react";
import CustomTimeline from "./CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";

export default class PersonView extends Component {
  render() {
    return (
      <div>
        <CustomTimeline />
      </div>
    );
  }
}
