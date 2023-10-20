import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Options from "./Options";
import { ReadMore, Arrows } from "../../styles/quetionsForm";

function QuestionsForm({
  numQuestions,
  handleQuestionChange,
  handleOptionChange,
  optionNfieldsn,
  rightAnsPosition,
  handleRightAnswer,
  isDisabled,
  loadMoreQuestions,
  loadedQuestions,
}) {
  return (
    <Box marginTop={1.5}>
      {Array.apply(null, {
        length: Math.min(numQuestions, loadedQuestions),
      }).map((elem, index) => (
        <Grid key={index}>
          <Typography>Question N°: {index + 1}</Typography>
          <Box>
            <TextField
              fullWidth
              label="write your question here"
              key={index}
              onChange={(e) => {
                handleQuestionChange(e, index);
              }}
              required
            />
          </Box>
          <Options
            optionNfieldsn={optionNfieldsn}
            handleOptionChange={handleOptionChange}
            index={index}
            rightAnsPosition={rightAnsPosition}
            handleRightAnswer={handleRightAnswer}
            isDisabled={isDisabled}
          />
        </Grid>
      ))}
      {numQuestions > loadedQuestions && (
        <ReadMore onClick={loadMoreQuestions}>
          <Arrows>
            <KeyboardDoubleArrowDownIcon />
          </Arrows>
        </ReadMore>
      )}
    </Box>
  );
}

export default QuestionsForm;
