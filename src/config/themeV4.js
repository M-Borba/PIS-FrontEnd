import { createTheme } from "@material-ui/core";

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
  },
});
