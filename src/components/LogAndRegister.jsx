import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import RegisterWlc from "./RegisterWlc";
import { main } from "../styledCore/register";
import { useNavigate } from "react-router-dom";
import bycript from "bcryptjs";

function LogAndRegister({ page, text, switcher, handleSub, errors }) {
  const [info, setInfo] = useState({});
  const [expand, setExpand] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    setExpand(true);
    // console.log(bycript.hashSync("123", 10));
  };

  const btn = {
    backgroundColor: "light",
    borderRadius: "50px",
    minWidth: "200px",
    marginTop: 0.5,
  };
  const navigate = useNavigate();
  return (
    <Box sx={main}>
      <Paper elevation={3} sx={{ width: "700px", height: "500px" }}>
        <Stack direction={"row"} height={"100%"} bgcolor={"white"}>
          <RegisterWlc />
          <Box
            item
            sx={{
              padding: "20px",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" component={"h6"} textAlign={"center"}>
              {page}
            </Typography>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ m: 0.5, width: "100%" }} variant="outlined">
                <OutlinedInput
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="name"
                  placeholder="user name"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              {errors.name && (
                <Box className="error" color="red" fontSize={14}>
                  {errors.name}
                </Box>
              )}

              <FormControl sx={{ m: 0.5, width: "100%" }} variant="outlined">
                <OutlinedInput
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="password"
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              {errors.messageOfNotExist && (
                <Box className="error" color="red" fontSize={14}>
                  Invalid email or password.
                </Box>
              )}
              {errors.password && (
                <Box className="error" color="red" fontSize={14}>
                  {errors.password}
                </Box>
              )}

              <Button
                sx={btn}
                variant="contained"
                onClick={() => handleSub(info)}
              >
                {page}
              </Button>
            </form>
            <Box fontSize={14} marginTop={4} textAlign={"center"}>
              {text}.{" "}
              <Typography
                variant="body1"
                component={"span"}
                color={"primary.main"}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/${switcher}`)}
              >
                {switcher}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LogAndRegister;
