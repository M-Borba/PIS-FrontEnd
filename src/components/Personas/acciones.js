import * as React from "react";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Acciones() {
    const handleEditClick = () => {
        // aca para editar la info
    };

    const handleRemoveClick = () => {
        // aca para borrar la persona
    };

    return (
        <div >
            <FormControlLabel
                control={
                    <IconButton
                        onClick={handleEditClick}
                    >
                        <EditIcon style={{ color: "rgb(30, 30, 30)" }} />
                    </IconButton>
                }
            />
            <FormControlLabel
                control={
                    <IconButton
                        onClick={handleRemoveClick}
                    >
                        <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
                    </IconButton>
                }
            />
        </div>
    );
};