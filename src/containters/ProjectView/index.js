/**
 * Proyect View
 *
 * This is the container that has all actions and components related
 * to de Proyect View, were we manage our proyects.
 *
 */

import React, { Component } from "react";
import CustomTimeline from "./CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";

export default class ProjectView extends Component {
  render() {
    return (
      <div>
        <CustomTimeline />
      </div>
    );
  }
}
