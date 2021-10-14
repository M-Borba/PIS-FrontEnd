import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AsignPersonForm from "../../components/AsignPersonForm";
import propTypes from "prop-types";
import { useStyles } from "./styles";


AgregarPersona.propTypes = {
    projectData: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
        startDate: propTypes.string,
        endDate: propTypes.string,
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
            console.log("lo enviado fue " + JSON.stringify(asignacion));
            // axiosInstance
            //     .post("/asignar", {
            //     person: person,
            //     proyect: proyect, 
            //     })
            //     .then((response) => {
            //     if (response.status == 200) {
            //         setMsg("Usuario creado correctamente");
            //         setError("");
            //     } else setError("Error inesperado");
            //     })
            //     .catch((error) => {
            //     console.log("error", error.response);
            //     if (
            //         error.response != undefined &&
            //         error.response.status != null &&
            //         error.response.status == 401
            //     )
            //         setError("Falta autentificarse !");
            //     else if (error.response.status == 400) {
            //         let errors = error.response.data.errors;
            //         setError(
            //         "Error, hay un problema con los datos ingresados - " +
            //             Object.keys(errors)[0] +
            //             " " +
            //             errors[Object.keys(errors)[0]]
            //         );
            //     } else
            //         setError(
            //         "Error inesperado al enviar formulario - " +
            //             Object.keys(errors)[0] +
            //             " " +
            //             errors[Object.keys(errors)[0]]
            //         );
            //     });
        }
    };

    const checkInput = (e) => {
        console.log("called on " + e.target.id);
        if (e.target.id == "role")
            setAsignacion({ ...asignacion, role: e.target.value });
    }

    const classes = useStyles();

    const [people, setPeople] = useState([]);

    useEffect(() => {
        axiosInstance.get("/people").then((response) => {
            setPeople(response.data.people.map((row) => ({
                fullName: row.full_name,
                id: row.id
            })))
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className={classes.paper}>
            <AsignPersonForm
                onSubmit={(e) => handleSubmit(e)}
                onInputChange={(e) => checkInput(e)}
                people={people}
                project={{
                    id: projectData.id,
                    startDate: projectData.startDate,
                    endDate: projectData.endDate
                }}
                msg={msg}
                error={error}
                title={"Asignando Persona a " + projectData.name}
            />
        </div>
    );
}