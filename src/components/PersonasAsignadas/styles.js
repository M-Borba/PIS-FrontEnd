import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: 600,
        overflow: 'auto'
    },
}));