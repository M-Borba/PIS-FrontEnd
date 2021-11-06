import React, { useEffect, useState, useRef, createContext } from "react";
import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";

export const UpdateGridContext = createContext();

const UpdateGridProvider = (props) => {
  const removeRow = useRef(null);
  const editRow = useRef(null);
  return (
    <UpdateGridContext.Provider value={[removeRow, editRow]}>
      {props.children}
    </UpdateGridContext.Provider>
  );
};

UpdateGridProvider.propTypes = {
  children: propTypes.any,
};

export default function ListarPersonas() {
  var rawRows;
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axiosInstance.get("/people").then((response) => {
      rawRows = response.data.people;

      let rowsNuevas = rawRows.map((row) => {
        return {
          fullName: row.full_name,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          id: row.id,
          cargaHoraria: row.working_hours,
          tag: ".",
          technologies: row.technologies,
        };
      });
      setRows(rowsNuevas);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography
        style={{ marginTop: 20 }}
        color="primary"
        variant="h4"
        align="center"
      >
        LISTADO DE PERSONAS
      </Typography>
      <UpdateGridProvider>
        <Personas rows={rows} setRows={setRows} />
      </UpdateGridProvider>
    </div>
  );
}
