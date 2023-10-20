import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const RightAns = styled(Box)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
}));

// {
//   color: theme.palette.primary.main

// }
function AccordionShape({ element }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography> {element.text}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {element.options.map((it, index) =>
          element.correctAnswer == it ? (
            <RightAns key={index} sx={{ p: 2 }}>
              {it}
            </RightAns>
          ) : (
            <Box key={index} sx={{ p: 2, border: "1px dashed grey" }}>
              {it}
            </Box>
          )
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionShape;
