import React, { memo, useState } from "react";
import Layout from "../../components/Layout";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { QuestionMark } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { btn } from "../../styledCore/buttonS";
import { useNavigate } from "react-router-dom";
import MultipleSelectCheckmarks from "../../components/MultipleSelectCheckmarks";
import { useQuery } from "react-query";

function CreateExam() {
  // *********
  const [topic, setTopic] = useState({});
  const [questionOb, setQuestionOb] = useState({});
  const [personName, setPersonName] = useState([]);
  // ********
  const [numQuestions, setNumQuestions] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rightAnsPosition, setRightAnsPosition] = useState({});
  const [optionNfieldsn, setOtionNfield] = useState(4);

  //*********************************************************** */
  const navigate = useNavigate();

  const handleCreateTopic = (e) => {
    e.preventDefault();

    let theOp = Object.values(questionOb);
    let theoptions = theOp.map((item) => ({
      ...item,
      options: Object.values(item.options),
    }));
    let theCheckerOfCheckbox = theOp.every(
      (item) =>
        typeof item.correctAnswer === "string" && item.correctAnswer !== ""
    );
    if (theCheckerOfCheckbox) {
      const studentsIds = personName.map((st) => st.id);
      axios.post("http://localhost:5000/topics", {
        ...topic,
        id: Date.now(),
        questions: theoptions,
        students: studentsIds,
      });
      navigate("/");
    } else {
      alert("You should click on every box corresponds the correct answer");
    }
  };

  const handleChangeHeader = (e) => {
    let topicOb = { ...topic };
    topicOb[e.target.name] = e.target.value;
    setTopic(topicOb);
    if (e.target.name === "nm_of_questions") {
      const newValue = parseInt(e.target.value, 10);
      setNumQuestions(newValue);
      let ob = {};
      for (let i = 0; i < newValue; i++) {
        ob[i] = {};
      }
      setQuestionOb({ ...questionOb, ...ob });
    }
  };

  const handleQuestionChange = (e, id) => {
    let ob = { ...questionOb };

    ob[id] = { ...ob[id], id, text: e.target.value };
    setQuestionOb(ob);
  };
  //   **********************************
  const handleOptionChange = (e, index, id) => {
    let theO = questionOb[id]["options"];
    let opt = { ...theO, [index]: e.target.value };
    let currentState = { ...questionOb };
    if (currentState.hasOwnProperty(id)) {
      currentState[id] = {
        ...currentState[id],
        options: { ...opt },
      };
    }

    setQuestionOb(currentState);
  };

  //************************************************************** */

  const handleRightAnswer = (inOption, inQuestion) => {
    questionOb[inQuestion]["correctAnswer"] =
      questionOb[inQuestion]["options"][inOption];
    let variable = questionOb[inQuestion]["options"][inOption];
    setQuestionOb({
      ...questionOb,
      [inQuestion]: {
        ...questionOb[inQuestion],
        correctAnswer: questionOb[inQuestion]["options"][inOption],
      },
    });
    setRightAnsPosition({ ...rightAnsPosition, [inQuestion]: inOption });
  };
  const handleOptionsFields = (e) => {
    setRightAnsPosition({});
    setOtionNfield(e.target.value);
  };
  const handleChangeSelect = (event) => {
    setPersonName(
      event.target.value.map((selectedValue) =>
        data.find((name) => name.name === selectedValue)
      )
    );
  };

  async function fetchData() {
    const response = await axios.get("http://localhost:5000/students");
    return response.data;
  }
  const { data, isLoading, error } = useQuery("users", fetchData);

  return (
    <Layout>
      <form onSubmit={handleCreateTopic}>
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
                required
              />
            </Box>
            <Box mr={1}>
              <TextField
                label="Number of questions"
                type="number"
                onChange={handleChangeHeader}
                name="nm_of_questions"
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
          <MultipleSelectCheckmarks
            students={data}
            personName={personName}
            handleChangeSelect={handleChangeSelect}
          />
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
                  onChange={(e) => handleQuestionChange(e, index)}
                  required
                />
              </Box>
              <Grid container spacing={1} marginTop={0.5} marginBottom={4}>
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
            </Grid>
          ))}
        </Box>

        <Button
          type="submit"
          sx={btn}
          variant="contained"
          disabled={numQuestions > 0 ? false : true}
        >
          Submit
        </Button>
      </form>
    </Layout>
  );
}

export default memo(CreateExam);
