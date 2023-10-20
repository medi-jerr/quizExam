import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { Button, Stack, Typography } from "@mui/material";
import useDataFetcher from "../../hooks/useDataFetcher";
import CircularColor from "../../components/common/loading";
import StExamHder from "../../components/teacher/StExamHder";
import { Options } from "../../styles/option";
import Popup from "../../components/student/Popup";
import PopupEnd from "../../components/student/PopupEnd";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";

function StExam() {
  const [stAnswerPosition, setStAnswerPosition] = useState(null);
  const [stAnswer, setStAnswer] = useState("");
  const [nextQuestion, setNextQuestion] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [stopTimer] = useState(false);
  const [point, setPoint] = useState(0);
  const [showPopupEnd, setShowPopupEnd] = useState(false);
  const [score, setScore] = useState("0%");

  const { user } = useUser();
  const { state } = useLocation();

  const { data, isLoading, error } = useDataFetcher(
    `${process.env.REACT_APP_EXAMS}${state}`
  );

  useEffect(() => {
    setShowPopup(true);
  }, []);
  // const data = useMemo(() => {
  //   if (!data || !Array.isArray(data) || data.length === 0) return {};
  //   return data;
  // }, [data]);

  const handleAnswer = (ans, pos) => {
    setStAnswerPosition(pos);
    setStAnswer(ans);
  };

  const handleSubmitAndNext = () => {
    if (data.nm_of_questions > nextQuestion) {
      const currentQuestion = data.questions[nextQuestion];

      let newPoint = point;
      if (stAnswer === currentQuestion.correctAnswer) {
        newPoint += 1;
      }

      const newScore =
        ((newPoint * 100) / data.nm_of_questions).toFixed(2) + "%";

      if (data.nm_of_questions - 1 === nextQuestion) {
        axios.patch(`${process.env.REACT_APP_STUDENTS}${user.id}`, {
          scores: {
            ...user.scores,
            [data.name]: { date: Date.now(), note: newScore },
          },
        });
        setShowPopupEnd(true);
      } else {
        setNextQuestion(nextQuestion + 1);
      }

      setStAnswerPosition(null);
      setPoint(newPoint);
      setScore(newScore);
    }
  };

  const startTest = () => {
    setShowPopup(false);
  };
  if (isLoading) {
    return <CircularColor />;
  }
  const onTimerEnd = () => {
    let newPoint = point;
    const newScore = ((newPoint * 100) / data.nm_of_questions).toFixed(2) + "%";
    axios.post(process.env.REACT_APP_STUDENTS, {
      id: Date.now(),
      name: "user n° " + Date.now().toString().slice(-5),
      score: newScore,
      exame: data.name,
    });
    setShowPopupEnd(true);
  };
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Layout>
      {showPopup ? (
        <Popup
          calbackfun={startTest}
          username={user.name}
          showPopup={showPopup}
        />
      ) : showPopupEnd ? (
        <PopupEnd score={score} username={user.name} />
      ) : (
        <>
          <StExamHder
            data={data}
            onTimerEnd={onTimerEnd}
            stopTimer={stopTimer}
            username={user.name}
          />
          <Stack alignItems={"center"}>
            <Typography variant={"h6"}>
              <Typography color={"primary.main"} variant="span">
                {nextQuestion + 1}
              </Typography>
              /{data.questions.length}
            </Typography>
            <Typography justifyContent={"center"} mb={1}>
              {data.questions[nextQuestion].text}
            </Typography>
            <Stack width={"100%"}>
              {data.questions[nextQuestion].options.map((it, i) => (
                <Options
                  elevation={3}
                  key={i}
                  onClick={() => handleAnswer(it, i)}
                  sx={{
                    bgcolor: stAnswerPosition === i ? "primary.light" : "",
                  }}
                >
                  {it}
                </Options>
              ))}
            </Stack>
            <Button
              onClick={handleSubmitAndNext}
              variant="contained"
              sx={{
                borderRadius: "50px",
                minWidth: "200px",
              }}
            >
              Submit
            </Button>
          </Stack>
        </>
      )}
    </Layout>
  );
}

export default StExam;
