/**
 * Proyect View
 *
 * This is the container that has all actions and components related
 * to de Proyect View, were we manage our proyects.
 *
 */

import React from "react";
import CustomTimeline from "./CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";
import PropTypes from "prop-types";

ProjectView.propTypes = {
  isProjectView: PropTypes.bool,
  onSwitch: PropTypes.func,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  organization: PropTypes.string,
  setOrganization: PropTypes.func,
};

export default function ProjectView({
  onSwitch,
  isProjectView,
  filters,
  setFilters,
  organization,
  setOrganization,
}) {
  return (
    <div>
      <CustomTimeline
        filters={filters}
        setFilters={setFilters}
        organization={organization}
        setOrganization={setOrganization}
        onSwitch={onSwitch}
        isProjectView={isProjectView}
      />
    </div>
  );
}
