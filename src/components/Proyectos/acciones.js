import * as React from "react";
import { FormControlLabel, IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Acciones() {
    const handleInfoClick = () => {
        // aca para ver la info
    };

    const handleRemoveClick = () => {
        // aca para borrar la persona
    };

    return (
        <div style={{
            margin: 10
        }}>
            <FormControlLabel
                control={
                    <Button variant="outlined"
                        onClick={handleInfoClick}
                    >
                        Ver Info Completa
                    </Button>
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
        </div >
    );
};