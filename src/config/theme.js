import { createTheme } from "@mui/material/styles";

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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "229px",
          height: " 41px",
          fontFamily: '"Nunito Sans", sans-serif',
          background: "#FFFFFF",
          border: "1px solid #F8F8FA",
          boxSizing: "border-box",
          boxShadow: "0px 2px 10px 3px rgba(152, 152, 152, 0.06)",
          borderRadius: "15px",
          padding: "12px 12px",
          "&.Mui-focused ": {
            border: "2px solid #6B5ECD",
          },
          "&:hover": {
            border: "1px solid #6B5ECD",
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
  },
  typography: {
    allVariants: {
      fontFamily: "'Nunito Sans'",
    },
  },
});
