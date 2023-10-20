import { Paper, styled } from "@mui/material";

export const Board = styled(Paper)(({ theme }) => ({
  padding: "20px",
  height: "60vh",
  width: "800px",
  overflowY: "scroll",
  overflowX: "hidden",
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    width: "1000px",
  },
  [theme.breakpoints.up(1000)]: {
    width: "900px",
  },
  [theme.breakpoints.down(1000)]: {
    width: "100%",
  },
}));
