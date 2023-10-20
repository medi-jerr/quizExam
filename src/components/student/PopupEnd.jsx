import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { pp, elment } from "../../styles/popupStyle";
import WaveImage from "../../assets/wave.svg";
import WaveImageT from "../../assets/waveT.svg";
import { useTheme } from "@mui/material/styles";
import { btn } from "../../styles/buttonS";
import { useNavigate } from "react-router-dom";

function PopupEnd({ score, username }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const wv = {
    position: "absolute",
    bottom: "0px",
    left: "-10%",
    zIndex: 1,
  };
  const wnT = {
    position: "absolute",
    zIndex: 100,
    bottom: "0px",
    left: 0,
  };
  return (
    <Box sx={pp}>
      <Box sx={elment}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">
            Hi{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {username}
            </span>
          </Typography>
          <Typography variant="h6">Your score is</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "70%",
              padding: "10px",
              height: "150px",
              marginTop: "10px",
              color: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">{score}</Typography>
          </Paper>
          <Button
            sx={{
              ...btn,
              position: "static",
              transform: "translateX(0)",
              maxWidth: "200px",
              marginTop: 1,
            }}
            variant="contained"
            onClick={() => navigate("/account")}
          >
            Account
          </Button>
        </Box>
        <Box
          position={"absolute"}
          bottom={0}
          width={"100%"}
          height={"50px"}
          sx={{ overflow: "hidden" }}
        >
          <img
            src={WaveImage}
            alt=""
            className="wavesOne"
            width={"110%"}
            style={wv}
          />
          <img
            src={WaveImageT}
            alt=""
            className="wavesTwo"
            width={"110%"}
            style={wnT}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PopupEnd;
