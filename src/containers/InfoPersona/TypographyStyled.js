import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

export const TypographyHeader = styled(Typography)(({ theme }) => ({
  marginLeft: 10,
  overflowWrap: "break-word",
  fontWeight: 700,
  fontSize: "22px",
}));

export const TypographyLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "15px",
}));
export const TypographyData = styled(Typography)(({ theme }) => ({
  marginLeft: "22px",
  fontWeight: 400,
  fontSize: "15px",
}));
