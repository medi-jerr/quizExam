// CreateExamFormFields.js
import React, { memo } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { QuestionMark } from "@mui/icons-material";

const CreateExamFormFields = memo(
  ({ handleChangeHeader, handleOptionsFields }) => {
    return (
      <>
        <Typography
          variant="h5"
          color={"primary"}
          display={"flex"}
          paddingLeft={"10px"}
        >
          Create Exam{" "}
          <Typography
            sx={{
              transform: "rotate(-45deg)",
              marginLeft: "5px",
            }}
          >
            <QuestionMark />
          </Typography>
        </Typography>

        <Box display={"flex"} justifyContent={"space-around"} marginTop={1.5}>
          <Box mr={1}>
            <TextField
              label="Exam name"
              onChange={handleChangeHeader}
              name="name"
              required
            />
          </Box>

          <Box mr={1}>
            <TextField
              label="Duration"
              type="number"
              onChange={handleChangeHeader}
              name="duration"
              placeholder="min"
              required
            />
          </Box>

          <Box mr={1}>
            <TextField
              label="Number of questions"
              type="number"
              onChange={handleChangeHeader}
              name="nm_of_questions"
              maxRows={5}
            />
          </Box>
          <Box mr={1}>
            <TextField
              label="Number of options"
              type="number"
              onChange={handleOptionsFields}
            />
          </Box>
        </Box>
      </>
    );
  }
);

export default CreateExamFormFields;
