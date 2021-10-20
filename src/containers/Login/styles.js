import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    imgcontainer: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    paper: {
        marginTop: 200,

    }
}));