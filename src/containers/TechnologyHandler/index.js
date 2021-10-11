/**
 * TechnologyHandler
 *
 * Handles call to backend for technologies
 *
 */

import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import PropTypes from "prop-types";
import TechnologyForm from "../../components/TechnologyForm";



TechnologyHandler.propTypes = {
  techSelected: PropTypes.array,
  setTechSelected: PropTypes.func,
};
export default function TechnologyHandler({ techSelected, setTechSelected }) {
  const [techList, setTechList] = useState([]);
  const [inputTech, setInputTech] = useState("");
  const [senioritySelected, setSeniority] = useState("junior");
  useEffect(() => {
    axiosInstance
      .get("/technologies")
      .then((response) => {
        console.log(response.data.technologies);
        setTechList(response.data.technologies)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onAdd = ([inputTech, senioritySelected]) => {
    if (inputTech != undefined && inputTech != null && inputTech != "") {
      let filteredTechs = techSelected.filter(([tech, seniority]) => {
        if (tech == inputTech) {
          return false;
        } else
          return true
      })
      filteredTechs.push([inputTech, senioritySelected]);
      setTechSelected(filteredTechs);

    }
  };
  const onRemove = ([inputTech, _senioritySelected]) => {
    setTechSelected(techSelected.filter(([tech, seniority]) => {
      if (tech == inputTech)
        return false;
      else
        return true
    }));
  };
  const onInputChange = (event, newValue) => {
    newValue = newValue || "-";
    if (typeof newValue === "string") {
      setInputTech(newValue);
    } else if (newValue) {
      // Create a new value from the user input
      setInputTech(newValue.inputValue);
    } else {
      setInputTech(newValue);
    }
  };

  return (
    <TechnologyForm
      onAdd={onAdd}
      onRemove={onRemove}
      techList={techList}
      selectedList={techSelected}
      inputTech={inputTech}
      onInputChange={onInputChange}
      senioritySelected={senioritySelected}
      setSeniority={setSeniority}
    />
  );
}
