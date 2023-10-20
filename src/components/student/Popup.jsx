import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { pp, elment, wv, wnT } from "../../styles/popupStyle";
import WaveImage from "../../assets/wave.svg";
import WaveImageT from "../../assets/waveT.svg";
import { styled, useTheme } from "@mui/material/styles";
import { btn } from "../../styles/buttonS";
import { CSSTransition } from "react-transition-group";

function Popup({ calbackfun, username, showPopup }) {
  const theme = useTheme();

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
          <Typography variant="h6">You should pass an exam now</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{
              ...btn,
              position: "static",
              transform: "translateX(0)",
              maxWidth: "200px",
            }}
            variant="contained"
            onClick={calbackfun}
          >
            Start
          </Button>
          <Paper
            elevation={3}
            sx={{
              width: "70%",
              padding: "10px",
              height: "150px",
              marginTop: "10px",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Question
            </Typography>
            <Stack spacing={0.5} mt={1} alignItems={"center"}>
              {Array(4)
                .fill(null)
                .map((it, i) => (
                  <Paper
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 3,
                      fontSize: "10px",
                      padding: "4px",
                      width: "100%",
                      flexGrow: 1,
                    }}
                  >
                    Option {i + 1}
                  </Paper>
                ))}
              <Box
                bgcolor={"primary.main"}
                sx={{
                  borderRadius: 3,
                  width: 100,
                  textAlign: "center",
                  color: "white",
                  fontSize: "10px",
                  padding: "3px",
                }}
              >
                {" "}
                Submit
              </Box>
            </Stack>
          </Paper>
        </Box>
        <Box>
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

export default Popup;
