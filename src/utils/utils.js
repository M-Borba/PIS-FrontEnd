import React from "react";

import { COLORS } from "../config/globalVariables";

export const renderColor = (state) => {
  let color = "";
  switch (state?.toLowerCase()) {
    case "verde":
      color = COLORS.stateGreen;
      break;
    case "rojo":
      color = COLORS.stateRed;
      break;
    case "amarillo":
      color = COLORS.stateYellow;
      break;
    case "upcoming":
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
