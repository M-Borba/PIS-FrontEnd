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
          color: `${baseTheme.palette.black} !important`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${baseTheme.palette.black}`,
          },
        },
      },
    },
  },
});
