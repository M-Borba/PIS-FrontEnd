import { createTheme } from "@mui/material/styles";

import { COLORS } from "./globalVariables";

const baseTheme = createTheme({
  palette: {
    black: "#000",
    primary: { main: "#000" },
  },
});

export default createTheme({
  ...baseTheme,
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          top: "-7px",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            outline: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "41px",
          fontFamily: '"Nunito Sans", sans-serif',
          background: COLORS.white,
          border: `1px solid ${COLORS.textFieldBorder}`,
          boxSizing: "border-box",
          boxShadow: "0px 2px 10px 3px rgba(152, 152, 152, 0.06)",
          borderRadius: "15px",
          padding: "12px 12px",
          "&.Mui-focused ": {
            border: `2px solid ${COLORS.primaryPurple}`,
          },
          "&:hover": {
            border: `1px solid ${COLORS.primaryPurple}`,
          },
        },
        notchedOutline: {
          border: 0,
        },
        input: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: COLORS.menuItemSelected,
          },
          "&:hover": {
            backgroundColor: COLORS.menuItemHover,
          },
        },
      },
    },
  },

  typography: {
    allVariants: {
      fontFamily: "'Nunito Sans', sans serif",
    },
  },
});
