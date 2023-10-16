import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import useDataFetcher from "../../hooks/useDataFetcher";
import StudentsNotes from "../../components/StudentsNotes";
import { convertUserToArra } from "../../functions/studentNotes";
import moment from "moment";
import { Navigate, useLocation } from "react-router-dom";

function StNotes() {
  const [tableContentsTitle, setTbCtTl] = useState(["Name", "Exam", "Date"]);
  const [tablOb, setTabOb] = useState([]);
  const [tableKeys, setTableKeys] = useState(["name", "exam", "date", "note"]);
  const { state } = useLocation();

  const { data } = useDataFetcher("http://localhost:5000/students");

  useEffect(() => {
    if (data) {
      let stpassExam = data.filter(
        (it) => typeof it["scores"][state] == "object"
      );
      let theTableData = stpassExam.map((it) => ({
        name: it.name,
        date: moment(it["scores"][state].date).format("MM/DD/YYYY"),
        note: it["scores"][state].note,
        exam: state,
      }));
      setTabOb(theTableData);
    }
  }, [data]);
  if (!state) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Layout>
      <StudentsNotes
        title="Students notes"
        tbct={tableContentsTitle}
        data={tablOb}
        notes="Notes"
        tableKeys={tableKeys}
      />
    </Layout>
  );
}

export default StNotes;
