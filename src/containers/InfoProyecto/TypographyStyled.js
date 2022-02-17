import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  variant: "body1",
  display: "inline",
  gutterBottom: true,
}));

export default TypographyStyled;
