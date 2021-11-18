import { useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import React from "react";
import InfoPersona from "../InfoPersona";
import propTypes from "prop-types";

FetchInfoPersona.propTypes = {
  id: propTypes.number,
};

export function FetchInfoPersona({ id }) {
  const [personData, setPersonData] = React.useState({});

  const fetchInfoPersona = (id) => {
    axiosInstance
      .get("/people/" + id)
      .then((response) => {
        let data = response.data.person;
        setPersonData({
          cargaHoraria: data.working_hours,
          email: data.email,
          fullName: data.full_name,
          technologies: data.technologies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInfoPersona(id);
  }, []);

  return <InfoPersona personData={personData} />;
}
