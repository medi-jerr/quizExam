import { DevTool } from "@hookform/devtools";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CreateExamC from "../../components/teacher/CreateExamC";
import { useForm } from "react-hook-form";
import Layout from "../../components/common/Layout";
import { MultipleSelectCheckmarks } from "../../components/teacher/MultipleSelectCheckmarks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

function CreateTest() {
  const [nQuestions, setNQuestions] = useState(0);
  const [nOptions, setNOptions] = useState(0);
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [examHeader, setExamHeader] = useState(null);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [personName, setPersonName] = useState([]);

  const navigate = useNavigate();
  async function fetchData() {
    const response = await axios.get(process.env.REACT_APP_STUDENTS);
    return response.data;
  }
  const { data, isLoading, error } = useQuery("users", fetchData);
  const mutation = useMutation((data) => {
    return axios
      .post(process.env.REACT_APP_EXAMS, data)
      .then((res) => res.data);
  });

  const { register, handleSubmit, control, reset } = useForm();

  const subHdr = (data) => {
    setNQuestions(data.nm_of_questions);
    setNOptions(data.options);
    setExamHeader({ ...data, id: Date.now() });

    if (
      questions.length !== parseInt(data.nm_of_questions) &&
      parseInt(data.nm_of_questions) >= parseInt(counter + 1)
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubAndNext = (data) => {
    let opt = Object.values(data);
    opt.shift();
    const quest = [
      ...questions,
      {
        id: counter,
        text: data.text,
        options: opt,
        correctAnswer: opt[rightAnswer],
      },
    ];
    setRightAnswer(null);
    setQuestions(quest);
    setCounter((prev) => prev + 1);
    if (parseInt(nQuestions) <= parseInt(counter + 1)) {
      setCounter(counter);
      handleClose();
      let exOb = {
        ...examHeader,
        students: personName.map((it) => it.id),
        questions: quest,
      };
      console.log(exOb);
      mutation.mutate(exOb);
      navigate("/");
      reset();
    }
  };
  const handleRightAnswer = (i) => {
    setRightAnswer(i);
  };
  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);
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

  return (
    <Layout>
      <>
        <form onSubmit={handleSubmit(subHdr)}>
          <Box>
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
                ></Typography>
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"space-around"}
                marginTop={1.5}
              >
                <Box mr={1}>
                  <TextField
                    label="Exam name"
                    name="name"
                    required
                    {...register("name")}
                  />
                </Box>

                <Box mr={1}>
                  <TextField
                    label="Duration"
                    type="number"
                    name="duration"
                    placeholder="min"
                    {...register("duration")}
                    required
                  />
                </Box>

                <Box mr={1}>
                  <TextField
                    label="Number of questions"
                    type="number"
                    name="nm_of_questions"
                    {...register("nm_of_questions")}
                  />
                </Box>
                <Box mr={1}>
                  <TextField
                    label="Number of options"
                    type="number"
                    {...register("options")}
                  />
                </Box>
              </Box>
              <MultipleSelectCheckmarks
                students={memoizedData}
                personName={personName}
                handleChangeSelect={handleChangeSelect}
              />
            </>
          </Box>
          <Divider sx={{ margin: "15px 0px" }} />

          <Box sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <DevTool control={control} />
        <CreateExamC
          nQuestions={nQuestions}
          nOptions={nOptions}
          showPP={open}
          handleClose={handleClose}
          questions={questions}
          counter={counter}
          handleSubAndNext={handleSubAndNext}
          handleRightAnswer={handleRightAnswer}
          rightAnswer={rightAnswer}
        />
      </>
    </Layout>
  );
}

export default CreateTest;
