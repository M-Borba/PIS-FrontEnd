/**
 * Create Administrator
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import AdministratorForm from "../../components/AdministradorForm";
import propTypes from "prop-types";

CreateAdministrator.propTypes = {
  setNotify: propTypes.func.isRequired,
};

export default function CreateAdministrator({ setNotify }) {
  const [administrator, setAdministrator] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (administrator.email == "" || administrator.password == "" || administrator.password_confirmation == "") {
      setNotify({
        isOpen: true,
        message: "Falta completar campos obligatorios.",
        type: "error",
        reload: false,
      })
    } else if (administrator.password != administrator.password_confirmation) {
      setNotify({
        isOpen: true,
        message: "Las contraseñas no coinciden",
        type: "error",
        reload: false,
      });
    } else {
        axiosInstance
          .post("/users", {
            user: {
              ...administrator,
            },
          })
          .then((response) => {
            if (response.status == 200)
              setNotify({
                isOpen: true,
                message: `El administrador se creo con exito.`,
                type: "success",
                reload: true,
              });
            else
              setNotify({
                isOpen: true,
                message: `Error inesperado.`,
                type: "error",
                reload: false,
              });
          })
          .catch((error) => {
            let errorsArray = error.response.data.errors.full_messages;
            let message = "";
            errorsArray.forEach((e) => (message += e + ", "));
            setNotify({
              isOpen: true,
              message: message.slice(0, -2),
              type: "error",
              reload: false,
            });
          });
      };
  }

  const handleInputChange = (e) => {
    if (e.target.id == "email") {
      setAdministrator({
        ...administrator,
        email: e.target.value.toLowerCase().replace(" ", ""),
      });
    } else if (e.target.id == "first_name") {
      setAdministrator({ ...administrator, first_name: e.target.value });
    } else if (e.target.id == "last_name") {
      setAdministrator({ ...administrator, last_name: e.target.value });
    } else if (e.target.id == "password") {
      setAdministrator({ ...administrator, password: e.target.value });
    } else if (e.target.id == "password_confirmation") {
      setAdministrator({ ...administrator, password_confirmation: e.target.value });
    }
    if (
      (e.target.id == "password" || e.target.id == "password_confirmation") &&
      !(administrator.password == administrator.password_confirmation)
    )
      setNotify({
        isOpen: true,
        message: "Las contraseñas no coinciden",
        type: "error",
        reload: false,
      });
  };

  return (
    <div>
      <AdministratorForm
        title={"Creación de administrador"}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        administrator={administrator}
      />
    </div>
  );
}
