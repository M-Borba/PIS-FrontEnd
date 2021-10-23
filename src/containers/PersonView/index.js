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
import PropTypes from "prop-types";

PersonView.propTypes = {
  isProjectView: PropTypes.bool,
  onSwitch: PropTypes.func,
};

export default function PersonView({ onSwitch, isProjectView }) {
  return (
    <div>
      <CustomTimeline onSwitch={onSwitch} isProjectView={isProjectView} />
    </div>
  );
}
