import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "../../components/common/Layout";
import { Box, Button, Divider } from "@mui/material";
import axios from "axios";
import { btn } from "../../styles/buttonS";
import { useNavigate } from "react-router-dom";
import { MultipleSelectCheckmarks } from "../../components/teacher/MultipleSelectCheckmarks";
import { useQuery } from "react-query";
import CreateExamFormFields from "../../components/teacher/CreateExamFormField";
import QuestionsForm from "../../components/teacher/QestionsForm";
import CircularColor from "../../components/common/loading";
import Error from "../Error";

function CreateExam() {
  // *********
  const [topic] = useState({});
  const [questionOb, setQuestionOb] = useState({});
  const [personName, setPersonName] = useState([]);
  // ********
  const [numQuestions, setNumQuestions] = useState(0);
  const [isDisabled] = useState(false);
  const [rightAnsPosition, setRightAnsPosition] = useState({});
  const [optionNfieldsn, setOtionNfield] = useState(2);
  const [examName, setExamName] = useState({});
  const [loadedQuestions, setLoadedQuestions] = useState(3);
  //*********************************************************** */
  // ***********************
  const navigate = useNavigate();
  async function fetchData() {
    const response = await axios.get(process.env.REACT_APP_STUDENTS);
    return response.data;
  }
  const { data, isLoading, error } = useQuery("users", fetchData);

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  useEffect(() => {
    let ob = {};
    for (let i = 0; i < numQuestions; i++) {
      ob[i] = {};
    }
    setQuestionOb({ ...questionOb, ...ob });
  }, [numQuestions]);

  const handleCreateTopic = (e) => {
    e.preventDefault();
    console.log(questionOb);
    let theOp = Object.values(questionOb);
    let theoptions = theOp.map((item) => ({
      ...item,
      options: Object.values(item.options),
    }));
    let theCheckerOfCheckbox = theOp.every(
      (item) =>
        typeof item.correctAnswer === "string" && item.correctAnswer !== ""
    );
    console.log(theCheckerOfCheckbox);

    if (theCheckerOfCheckbox) {
      const studentsIds = personName.map((st) => st.id);
      axios.post(process.env.REACT_APP_EXAMS, {
        ...topic,
        ...examName,
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
    setExamName({ ...examName, [e.target.name]: e.target.value });
    if (e.target.name === "nm_of_questions") {
      const newValue = parseInt(e.target.value, 10);
      setNumQuestions(newValue);
    }
  };

  const handleQuestionChange = (e, id) => {
    let ob = { ...questionOb };

    ob[id] = { ...ob[id], id, text: e.target.value };
    setQuestionOb(ob);
  };

  //   **********************************
  const handleOptionChange = useCallback(
    (e, index, id) => {
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
    },
    [questionOb]
  );

  //************************************************************** */

  const handleRightAnswer = (inOption, inQuestion) => {
    if (questionOb[inQuestion]["options"]) {
      questionOb[inQuestion]["correctAnswer"] =
        questionOb[inQuestion]["options"][inOption];
      let variable = questionOb[inQuestion]["options"][inOption];

      setQuestionOb({
        ...questionOb,
        [inQuestion]: {
          ...questionOb[inQuestion],
          correctAnswer: variable,
        },
      });
      setRightAnsPosition({ ...rightAnsPosition, [inQuestion]: inOption });
    }
  };
  const handleOptionsFields = useCallback(
    (e) => {
      setRightAnsPosition({});
      setOtionNfield(e.target.value);
    },
    [optionNfieldsn]
  );
  const handleChangeSelect = useCallback(
    (event) => {
      setPersonName(
        event.target.value.map((selectedValue) =>
          memoizedData.find((name) => name.name === selectedValue)
        )
      );
    },
    [memoizedData]
  );
  const loadMoreQuestions = () => {
    setLoadedQuestions(loadedQuestions + 3);
  };
  if (isLoading) {
    return <CircularColor />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Layout>
      <form onSubmit={handleCreateTopic}>
        <Box>
          <CreateExamFormFields
            handleChangeHeader={handleChangeHeader}
            handleOptionsFields={handleOptionsFields}
          />

          <MultipleSelectCheckmarks
            students={memoizedData}
            personName={personName}
            handleChangeSelect={handleChangeSelect}
          />
        </Box>
        <Divider sx={{ margin: "15px 0px" }} />
        <QuestionsForm
          numQuestions={numQuestions}
          handleQuestionChange={handleQuestionChange}
          handleOptionChange={handleOptionChange}
          handleRightAnswer={handleRightAnswer}
          optionNfieldsn={optionNfieldsn}
          rightAnsPosition={rightAnsPosition}
          isDisabled={isDisabled}
          loadMoreQuestions={loadMoreQuestions}
          loadedQuestions={loadedQuestions}
        />

        <Button
          type="submit"
          sx={btn}
          variant="contained"
          disabled={
            loadedQuestions >= numQuestions && numQuestions > 0 ? false : true
          }
        >
          Submit
        </Button>
      </form>
    </Layout>
  );
}

export default CreateExam;
