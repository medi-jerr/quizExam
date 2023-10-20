import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const Options = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  flexGrow: 1,
  borderRadius: "50px",
  marginBottom: "10px",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.primary.light,
  },
}));
