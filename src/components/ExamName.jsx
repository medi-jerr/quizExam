import React from "react";
import { Box, Button } from "@mui/material";

function ExamName({ vl, onClick, handleStudents }) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          padding: "10px 20px",
          marginBottom: "10px",
          borderRadius: "50px",
        }}
        onClick={() => onClick(vl)}
      >
        {" "}
        {vl.name} questions
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          padding: "10px 20px",
          marginBottom: "10px",
          borderRadius: "50px",
        }}
        onClick={() => handleStudents(vl.name)}
      >
        {" "}
        {vl.name} notes
      </Button>
    </Box>
  );
}

export default ExamName;
