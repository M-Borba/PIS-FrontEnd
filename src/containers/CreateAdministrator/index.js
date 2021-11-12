/**
 * Create Administrator
 */

import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import AdministratorForm from "../../components/AdministradorForm";
import propTypes from "prop-types";

CreateAdministrator.propTypes = {
  setNotify: propTypes.func.isRequired,
  addRow: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function CreateAdministrator({ setNotify, addRow, onClose }) {
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
      .then((response) => {
        let adminData = response.data.user;
        let nuevoAdmin = {
          id: adminData.id,
          email: adminData.email,
          fullName: adminData.name,
        };
        addRow(nuevoAdmin);
        setNotify({
          isOpen: true,
          message: `El administrador se creo con exito.`,
          type: "success",
          reload: false,
        });
        onClose();
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
