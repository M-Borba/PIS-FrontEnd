import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: 600,
    overflow: "auto",
  },
  subtext: {
    paddingLeft: 25,
    color: "#7d7d7d",
  },
}));
