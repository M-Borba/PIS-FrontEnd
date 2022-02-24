/**
 * Create Administrator
 */

import React, { useState } from "react";
import propTypes from "prop-types";
import { useSnackbar } from "notistack";

import { ADMIN_LABELS } from "../../config/globalVariables";
import { axiosInstance } from "../../config/axios";
import AdministratorForm from "../../components/AdministradorForm";

CreateAdministrator.propTypes = {
  addRow: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default function CreateAdministrator({ addRow, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
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
        enqueueSnackbar(
          `El administrador ${adminData.name} se creo con éxito.`,
          {
            variant: "success",
            autoHideDuration: 4000,
          }
        );
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
        title={ADMIN_LABELS.CREAR_ADMIN}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        administrator={administrator}
        errors={errors}
      />
    </div>
  );
}
