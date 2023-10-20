import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function StExamHder({ data, onTimerEnd, stopTimer = false, username }) {
  const initialTimeInSeconds = data.duration * 60;
  const [timeInSeconds, setTimeInSeconds] = useState(initialTimeInSeconds);

  useEffect(() => {
    const decrementTimer = () => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      } else {
        if (typeof onTimerEnd === "function") {
          onTimerEnd();
        }
      }
      if (stopTimer) {
        clearInterval(timerInterval);
      }
    };
    const timerInterval = setInterval(decrementTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [timeInSeconds, onTimerEnd, stopTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"} paddingLeft={"10px"}>
      <Typography flexGrow={1} variant="h6">
        username
        <Typography
          component={"span"}
          variant="h6"
          color={"primary.main"}
          ml={"10px"}
        >
          {username}
        </Typography>
      </Typography>

      <Typography flexGrow={1} variant="h6" mt={"15px"}>
        Exam
        <Typography
          component={"span"}
          variant="h6"
          color={"primary.main"}
          ml={"10px"}
        >
          {data.name}
        </Typography>
      </Typography>
      <Typography flexGrow={1} variant="h6">
        Counter
        <Typography
          component={"span"}
          variant="h6"
          color={"primary.main"}
          ml={"10px"}
        >
          {formatTime(timeInSeconds)} min
        </Typography>
      </Typography>
    </Box>
  );
}

export default StExamHder;
