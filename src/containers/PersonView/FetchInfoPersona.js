import react, {useEffect} from "react"
import {axiosInstance} from "../../config/axios";
import React from "react";
import InfoPersona from "../InfoPersona";
import propTypes from "prop-types";

FetchInfoPersona.propTypes = {
  id: propTypes.number,
};

export function FetchInfoPersona({id}) {
  const [personData, setPersonData] = React.useState({});
  const fetchInfoPersona = async (id) => {
    console.log("SE PIDIO INFO PARA ",id);
    const response = await axiosInstance.get("/people/" + id).then((response) => {
      let data = response.data.person;
      setPersonData( {
        cargaHoraria: data.working_hours,
        email: data.email,
        fullName: data.full_name,
        technologies: data.technologies
      });
    });
  }
  fetchInfoPersona(id);

  /*useEffect(() => {
    console.log("SE PIDIO INFO PARA ",id);
    axiosInstance.get("/people/" + id)
      .then((response) => {
      let data = response.data.person;
      setPersonData( {
        cargaHoraria: data.working_hours,
        email: data.email,
        fullName: data.full_name,
        technologies: data.technologies
      });
      })
      .catch((error) => {
      console.error(error);
      });
  }, );*/
  console.log("PERSONDATA PARA ",id, " -> ",personData);
  return (
    <InfoPersona
      personData={personData}
    />
  )

}
