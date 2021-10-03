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
import { CollectionsOutlined } from "@mui/icons-material";

TechnologyHandler.propTypes = {
  techSelected: PropTypes.array,
  setTechSelected: PropTypes.func,
};
export default function TechnologyHandler({ techSelected, setTechSelected }) {
  const [techList, setTechList] = useState(["-"]);
  const [inputTech, setInputTech] = useState("initialValue");
  useEffect(() => {
    //call to backend to load techs
    setTechList(["bbbbbb", "c", "d", " wxyz"]);
  }, []);
  const onAdd = (input) => {
    if (input != undefined && input != null && input != "") {
      let index = techSelected.indexOf(input);
      if (index == -1) {
        techSelected.push(input);
        setTechSelected(techSelected);
      }
    }
  };
  const onRemove = (techName) => {
    let index = techSelected.indexOf(techName);
    techSelected.splice(index, 1);
    setTechSelected(techSelected);
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
    />
  );
}
