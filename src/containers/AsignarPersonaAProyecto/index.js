import React, { useState } from "react";
import { axiosInstance } from "../../config/axios";
import AsignPersonForm from "../../components/AsignPersonForm";
import propTypes from "prop-types";
import { useStyles } from "./styles";


AgregarPersona.propTypes = {
    projectData: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
    }).isRequired,
};

export default function AgregarPersona({ projectData }) {
    const [asignacion, setAsignacion] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const isValid = () => {
        return (
            asignacion.role != ""
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid(asignacion)) {
            setError("Completar todos los campos para completar la asignación");
        } else {
            console.log("enviado");
        }
    };

    const checkInput = (e) => {
        if (e.target.id == "role")
            setAsignacion({ ...asignacion, role: e.target.value });
    }

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <AsignPersonForm
                onSubmit={(e) => handleSubmit(e)}
                onInputChange={(e) => checkInput(e)}
                proyecto={projectData}
                msg={msg}
                error={error}
                title={"Asignando Persona a " + projectData.name}
            />
        </div>
    );
}