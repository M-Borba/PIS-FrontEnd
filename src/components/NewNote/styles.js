import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  newNoteContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    gap: "24px",
    alignItems: "end",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "fit-content",
    color: "#ffffff",
    background: "#1c1c1c",
    "&:hover": {
      backgroundColor: "#404040",
      color: "#fff",
    },
  },
}));
