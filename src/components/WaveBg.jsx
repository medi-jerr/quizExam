import React from "react";
import WaveImage from "../assets/wave.svg";
import WaveImageT from "../assets/waveT.svg";
import { Box } from "@mui/material";

function WaveBg() {
  const wv = {
    position: "absolute",
    bottom: "-50px",
    left: "-10%",
    zIndex: -1,
  };
  const wnT = {
    position: "absolute",
    zIndex: 100,
    bottom: "-50px",
    left: 0,
  };
  return (
    <Box
      position={"fixed"}
      bottom={0}
      width={"100%"}
      height={"75px"}
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
  );
}

export default WaveBg;
