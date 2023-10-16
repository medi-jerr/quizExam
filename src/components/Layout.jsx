import React from "react";
import { Box, Container, Stack, Typography, Paper } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WaveBg from "./WaveBg";

function Layout({ children }) {
  return (
    <Box>
      <Container>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h2" component="h2" color="primary">
            Exams
            <QuestionMarkIcon
              fontSize="inherit"
              sx={{ transform: "rotate(-30deg)" }}
            />
          </Typography>
          <Box marginTop={"50px"}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                height: "60vh",
                width: "800px",
                overflowY: "scroll",
                overflowX: "hidden",
                position: "relative",
              }}
            >
              {children}
            </Paper>
          </Box>
        </Stack>
      </Container>
      <WaveBg />
    </Box>
  );
}

export default Layout;
