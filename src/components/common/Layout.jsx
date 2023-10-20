import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WaveBg from "./WaveBg";
import { Board } from "../../styles/layout";

function Layout({ children }) {
  return (
    <Box>
      <Container>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant="h2"
            component="h2"
            color="primary"
            sx={{ marginRight: { sm: "auto", lg: "0", xs: "auto" } }}
          >
            Exams
            <QuestionMarkIcon
              fontSize="inherit"
              sx={{ transform: "rotate(-30deg)" }}
            />
          </Typography>
          <Box
            marginTop={"50px"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Board elevation={3}>{children}</Board>
          </Box>
        </Stack>
      </Container>
      <WaveBg />
    </Box>
  );
}

export default Layout;
