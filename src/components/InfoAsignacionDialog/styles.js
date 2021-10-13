import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
    maxHeight: 400,
    overflow: "auto",
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  content: {
    margin: 0,
    padding: theme.spacing(2),
  },
  actions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    bottom: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
}));
