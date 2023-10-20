import React from "react";
import Layout from "../components/common/Layout";
import { Box, Typography } from "@mui/material";
import { main } from "../styles/error404";

function Error() {
  return (
    <Layout>
      <Box sx={main}>
        <Typography variant="h2" textAlign={"center"}>
          Oops
        </Typography>
        <Typography variant="h6">We can't seem to find</Typography>
        <Typography variant="h6">the page you are looking for! </Typography>
        <Typography variant="body2">Error 404</Typography>
      </Box>
    </Layout>
  );
}

export default Error;
