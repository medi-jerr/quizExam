import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ReadMore = styled("div")({
  textAlign: "center",
  cursor: "pointer",
  margin: "-10px 0 10px",
  height: "50px",
});
export const Arrows = styled(Box)({
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(5px)",
  },
});
