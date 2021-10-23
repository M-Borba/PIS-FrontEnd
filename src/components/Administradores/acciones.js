import * as React from "react";
import { FormControlLabel, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Acciones() {
    const handleRemoveClick = () => {
        // aca para borrar el admin
    };

    return (
        <div style={{
            margin: 10
        }}>
            <FormControlLabel
                control={
                    <IconButton
                        onClick={handleRemoveClick}
                    >
                        <DeleteIcon style={{ color: "rgb(30, 30, 30)" }} />
                    </IconButton>
                }
            />
        </div >
    );
};