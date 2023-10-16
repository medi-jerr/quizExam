import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <Stack
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      alignItems={"center"}
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
}
