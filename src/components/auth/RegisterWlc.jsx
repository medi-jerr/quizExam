import BgReg from "../../assets/splash.jpg";
import { useTheme } from "@emotion/react";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { WelcomComp } from "../../styles/auth";

function RegisterWlc() {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <WelcomComp item square elevation={4}>
      <img
        alt="ee"
        src={BgReg}
        width={"100%"}
        height={"100%"}
        style={{ objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          bgcolor: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(
            primaryColor.slice(3, 5),
            16
          )}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.7)`,
          width: "100%",
          height: "100%",
          top: 0,
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Typography variant="h3" color={"white"} textAlign={"center"}>
          Welcome to examQuiz
        </Typography>
      </Box>
    </WelcomComp>
  );
}

export default RegisterWlc;
