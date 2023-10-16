import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

function QuestionInputs({ element, index }) {
  return (
    <Box>
      {/* <Typography>Question N°: {index + 1}</Typography>
            <Box>
              <TextField
                fullWidth
                label="write your question here"
                onChange={handleTextChange}
              />
            </Box>
            
            <Grid container spacing={1} marginTop={0.5} marginBottom={4}>
              {Array.apply(null, { length: 4 }).map((it, i) => (
                <Grid item xs={6} key={i}>
                  <TextField
                    onChange={(e) => handleOptionChange(e, i)}
                    fullWidth
                    label="write option"
                    InputProps={{
                      endAdornment: (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleRightAnswer}
                              disabled={isDisabled}
                            />
                          }
                        />
                      ),
                    }}
                  />
                </Grid>
              ))}
            </Grid> */}
    </Box>
  );
}

export default QuestionInputs;
