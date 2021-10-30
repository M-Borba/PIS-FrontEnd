import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import Personas from "../../components/Personas";
import { Typography } from "@material-ui/core";
import { rolesFormateados } from "../../config/globalVariables";

export default function ListarPersonas() {
  var rows;
  const [rowsFormateadas, setRows] = useState([]);

  const fetchData = () => {
    axiosInstance.get("/people").then((response) => {
      rows = response.data.people;

      rows.forEach((person) => {
        person.roles = person.roles.map((role) => {
          return `${rolesFormateados[role]} `;
        });
      });

      let rowsNuevas = rows.map((row) => {
        return {
          fullName: row.full_name,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          id: row.id,
          roles: row.roles,
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
      <Personas rows={rowsFormateadas} />
    </div>
  );
}
