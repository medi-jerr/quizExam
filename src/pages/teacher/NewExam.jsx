import React, { memo, useCallback, useState } from "react";
import Layout from "../../components/Layout";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { QuestionMark } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SubmitButt from "../../components/SubmitButt";

function NewExam() {
  // *********
  const [topic, setTopic] = useState({
    id: Math.random() * 10,
    topic: "",
    duration: 5,
  });
  // ********
  const [numQuestions, setNumQuestions] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [questions, setQuestions] = useState([]);
  //*********************************************************** */
  const [newText, setNewText] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);

  // const handleCreateQuestions = () => {

  // };
  const handleCreateQuestions = useCallback(() => {
    const newQuestion = {
      id: questions.length + 1,
      text: newText,
      options: newOptions.filter((option) => option.trim() !== ""),
    };
    const temp = [...questions, newQuestion];
    setQuestions(temp);
    setNewText("");
    setNewOptions(["", "", "", ""]);
    console.log("lllll", questions);
  }, [newOptions, newText, questions]);

  console.log(questions);

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = e.target.value;
    setNewOptions(updatedOptions);
  };

  //************************************************************** */

  const handleGenerateQuestions = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setNumQuestions(newValue);
  };
  const handleRightAnswer = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Layout>
      <Box>
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
          <Box>
            <TextField label="Exam name" />
          </Box>
          <Box>
            <TextField label="Duration" type="number" />
          </Box>
          <Box>
            <TextField
              label="Number of questions"
              type="number"
              onChange={handleGenerateQuestions}
            />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ margin: "15px 0px" }} />
      <Box marginTop={1.5}>
        {Array.apply(null, { length: numQuestions }).map((elem, index) => (
          <Grid key={index}>
            <Typography>Question N°: {index + 1}</Typography>
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
            </Grid>
            {/* <button onClick={handleCreateQuestions}>klick here</button> */}
          </Grid>
        ))}
      </Box>
      <SubmitButt
        thePath={"/"}
        text={"Submit"}
        isDisbled={numQuestions > 0 ? false : true}
        onsub={handleCreateQuestions}
      />
    </Layout>
  );
}

export default memo(NewExam);
