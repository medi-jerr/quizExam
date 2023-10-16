import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";

import { useLocation } from "react-router-dom";

import AccordionShape from "../../components/AccordionSh";

function Exam() {
  const location = useLocation();

  console.log(location.state.name);

  return (
    <Layout>
      <Box
        sx={{ m: "0px 10px 20px" }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" component={"h6"}>
          Exame Description:{" "}
          <Box component={"span"} color={"primary.main"}>
            {location.state.name}
          </Box>
        </Typography>
        <Typography variant="h6" component={"h6"}>
          Duration:{" "}
          <Box component={"span"} color={"primary.main"}>
            {location.state.duration} min
          </Box>
        </Typography>
      </Box>
      {location.state.questions.map((it) => (
        <AccordionShape key={it.id} element={it} />
      ))}
    </Layout>
  );
}

export default Exam;
