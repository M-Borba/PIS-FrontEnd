import { makeStyles } from "@material-ui/core/styles";

import { COLORS } from "../../config/globalVariables";

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.typography.pxToRem(20),
    paddingBottom: theme.typography.pxToRem(20),
    borderBlockStart: `1px solid ${COLORS.containerBorder}`,
    borderBlockEnd: `1px solid ${COLORS.containerBorder}`,
  },
}));
