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

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/users", {
        user: {
          ...administrator,
        },
      })
      .then(() => {
        setNotify({
          isOpen: true,
          message: `El administrador se creo con exito.`,
          type: "success",
          reload: true,
        });
      })
      .catch((error) => {
        setErrors(error.response.data?.errors);
      });
  };

  const handleInputChange = (e) => {
    setErrors({});
    setAdministrator((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div>
      <AdministratorForm
        title={"Creación de administrador"}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        administrator={administrator}
        errors={errors}
      />
    </div>
  );
}
