import React from "react";

export const renderColor = (state) => {
  let color = "";
  switch (state?.toLowerCase()) {
    case "verde":
      color = "#7EDE6D";
      break;
    case "rojo":
      color = "#E87272";
      break;
    case "amarillo":
      color = "#FAE269";
      break;
    case "upcoming":
      color = "#B0CFCB";
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
