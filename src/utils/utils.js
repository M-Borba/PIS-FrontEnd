import React from "react";
import MenuItem from "@mui/material/MenuItem";

import {
  COLORS,
  DATE_FORMAT,
  FILTER_FORM_LABELS,
  PROJECT_STATE_VALUES,
} from "../config/globalVariables";
import moment from "moment";

export const renderColor = (state) => {
  let color = "";
  switch (state?.toLowerCase()) {
    case PROJECT_STATE_VALUES.VERDE:
      color = COLORS.stateGreen;
      break;
    case PROJECT_STATE_VALUES.ROJO:
      color = COLORS.stateRed;
      break;
    case PROJECT_STATE_VALUES.AMARILLO:
      color = COLORS.stateYellow;
      break;
    case PROJECT_STATE_VALUES.UPCOMING:
      color = COLORS.stateUpcoming;
      break;
  }
  return (
    <section
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: `${color}`,
      }}
    />
  );
};

export const renderMenuItems = (array) =>
  array.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

export const renderColorMenuItems = (withAny = false) => {
  const values = [
    {
      value: PROJECT_STATE_VALUES.VERDE,
      label: renderColor(PROJECT_STATE_VALUES.VERDE),
    },
    {
      value: PROJECT_STATE_VALUES.ROJO,
      label: renderColor(PROJECT_STATE_VALUES.ROJO),
    },
    {
      value: PROJECT_STATE_VALUES.AMARILLO,
      label: renderColor(PROJECT_STATE_VALUES.AMARILLO),
    },
    {
      value: PROJECT_STATE_VALUES.UPCOMING,
      label: renderColor(PROJECT_STATE_VALUES.UPCOMING),
    },
  ];
  withAny &&
    values.unshift({ value: "", label: FILTER_FORM_LABELS.CUALQUIERA });

  return renderMenuItems(values);
};

export const renderTipoMenuItems = (withAny = false) => {
  const values = [
    {
      value: "staff_augmentation",
      label: FILTER_FORM_LABELS.STAFF_AUGMENTATION,
    },
    { value: "end_to_end", label: FILTER_FORM_LABELS.END_TO_END },
    { value: "tercerizado", label: FILTER_FORM_LABELS.TERCERIZADO },
    { value: "hibrido", label: FILTER_FORM_LABELS.HIBIRDO },
  ];
  withAny &&
    values.unshift({ value: "", label: FILTER_FORM_LABELS.CUALQUIERA });

  return renderMenuItems(values);
};

export const rawDateToDateFormat = (rawDate) =>
  moment(rawDate).format(DATE_FORMAT);

export const dateToHyphenFormat = (date) => moment(date).format("yyyy-MM-DD");

export const dateFormatToMoment = (date) =>
  moment(date.split(" ")[0].split("/").reverse().join("-"));

export const typeRowDisplayFormat = (type) =>
  type.replaceAll("_", " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

export const stateRowDisplayFormat = (state) =>
  state.replace(/^\w/, (m) => m.toUpperCase());

export const dateSortComparator = (a, b) => {
  if (!a || !dateFormatToMoment(a).isValid()) return 1;
  if (!b || !dateFormatToMoment(b).isValid()) return -1;
  return dateFormatToMoment(a) - dateFormatToMoment(b);
};

const getStateValue = (state) => {
  switch (state) {
    case PROJECT_STATE_VALUES.VERDE_MAYUS:
      return 1;
    case PROJECT_STATE_VALUES.AMARILLO_MAYUS:
      return 2;
    case PROJECT_STATE_VALUES.ROJO_MAYUS:
      return 3;
    case PROJECT_STATE_VALUES.UPCOMING_MAYUS:
      return 4;
  }
};

export const stateSortComparator = (a, b) => {
  return getStateValue(a) - getStateValue(b);
};
