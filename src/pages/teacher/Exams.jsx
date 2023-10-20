import { Stack } from "@mui/material";
import React from "react";
import useDataFetcher from "../../hooks/useDataFetcher";
import CircularColor from "../../components/common/loading";
import NoContent from "../../components/common/NoContent";
import ExamName from "../../components/teacher/ExamName";
import Layout from "../../components/common/Layout";
import { useNavigate } from "react-router-dom";
import SubmitButt from "../../components/common/SubmitButt";

function Exams() {
  const { data, isLoading, error } = useDataFetcher(
    process.env.REACT_APP_EXAMS
  );
  const navigate = useNavigate();
  const handleChange = (vl) => {
    navigate("/teacher/exam", { state: vl });
  };
  const handleStudents = (exname) => {
    navigate("/teacher/notes", { state: exname });
  };
  if (isLoading) {
    return <CircularColor />;
  }

  return (
    <Layout>
      {data.length ? (
        data.map((item) => (
          <ExamName
            key={item.id}
            vl={item}
            onClick={handleChange}
            handleStudents={handleStudents}
          />
        ))
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <NoContent />
          {error ? `Sorry: ${error}` : `There is no Exam to show`}
        </Stack>
      )}

      <SubmitButt text={"Creat new Exam"} thePath={"/teacher/add"} />
    </Layout>
  );
}

export default Exams;
