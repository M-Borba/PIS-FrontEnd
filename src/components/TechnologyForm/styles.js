import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.typography.pxToRem(20),
    paddingBottom: theme.typography.pxToRem(20),
    borderBlockStart: "1px solid #e3e3e3",
    borderBlockEnd: "1px solid #e3e3e3",
  },
}));
