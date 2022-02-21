import { createTheme } from "@material-ui/core";

import { COLORS } from "./globalVariables";

export default createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Nunito Sans'",
    },
  },
  overrides: {
    MuiDataGrid: {
      root: {
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          fontSize: "14px",
        },
        "& .MuiDataGrid-cell": {
          fontSize: "16px",
        },
      },
    },
    MuiTypography: {
      body2: {
        fontSize: "14px !important",
        fontWeight: "700 !important",
      },
    },
    MuiButton: {
      root: {
        fontSize: "18px",
        fontWeight: "700",
        borderRadius: "31px",
      },
      contained: {
        color: COLORS.white,
        backgroundColor: COLORS.primaryPurple,
        "&:hover": {
          backgroundColor: COLORS.primaryPurpleHover,
        },
        textTransform: "none",
      },
    },
  },
});
