import React from "react";

import { COLORS, PROJECT_LABELS } from "../config/globalVariables";

export const renderColor = (state) => {
  let color = "";
  switch (state?.toLowerCase()) {
    case PROJECT_LABELS.ESTADO_VERDE_MIN:
      color = COLORS.stateGreen;
      break;
    case PROJECT_LABELS.ESTADO_ROJO_MIN:
      color = COLORS.stateRed;
      break;
    case PROJECT_LABELS.ESTADO_AMARILLO_MIN:
      color = COLORS.stateYellow;
      break;
    case PROJECT_LABELS.ESTADO_UPCOMING_MIN:
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
