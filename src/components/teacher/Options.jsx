import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import React from "react";

function Options({
  optionNfieldsn,
  handleOptionChange,
  index,
  rightAnsPosition,
  handleRightAnswer,
  isDisabled,
}) {
  return (
    <Grid container spacing={1} marginTop={0.5} marginBottom={2}>
      {Array.apply(null, { length: optionNfieldsn }).map((it, i) => (
        <Grid item xs={6} key={i}>
          <TextField
            onChange={(e) => handleOptionChange(e, i, index)}
            fullWidth
            label="write option"
            required
            disabled={rightAnsPosition[index] === i}
            InputProps={{
              endAdornment: (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rightAnsPosition[index] === i}
                      onChange={() => handleRightAnswer(i, index)}
                      disabled={isDisabled}
                    />
                  }
                />
              ),
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Options;
