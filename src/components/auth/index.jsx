import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import RegisterWlc from "./RegisterWlc";
import { main } from "../../styles/register";
import { AuthBoard, cnt } from "../../styles/auth";
import InfoBoard from "./InfoBoard";

function LogAndRegister({ page, text, switcher, handleSub, errors }) {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <Box sx={main}>
      <Container sx={cnt}>
        <AuthBoard elevation={3}>
          <Stack direction={"row"} height={"100%"} bgcolor={"white"}>
            <RegisterWlc />
            <InfoBoard
              handleSub={handleSub}
              handleChange={handleChange}
              errors={errors}
              info={info}
              page={page}
              text={text}
              switcher={switcher}
            />
          </Stack>
        </AuthBoard>
      </Container>
    </Box>
  );
}

export default LogAndRegister;
