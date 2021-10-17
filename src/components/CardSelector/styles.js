import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({

    root: {
        margin: "auto"
    },
    cardHeader: {
        padding: theme.spacing(1, 12),
        overflow: "auto",
    },
    list: {
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        marginTop: 4
    },
    collapse: {
        "& .MuiCollapse-wrapperInner": {
            display: "flex",
            flexDirection: "column"
        }
    },
    button: {
        margin: theme.spacing(0.5, 0)
    }
}));