import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { Avatar, Box, Button } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { list, numOfNotif, panelControl } from "../../styles/account";
import axios from "axios";
import moment from "moment/moment";
import { useUser } from "../../contexts/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import StudentsNotes from "../../components/common/StudentsNotes";
import ListNotification from "../../components/common/ListNotification";
import CircularColor from "../../components/common/loading";
import env from "react-dotenv";

function Account() {
  const [showNotif, setShowNotif] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [exist, setExist] = useState([]);
  const [scores, setScores] = useState([]);
  const [tableKeys] = useState(["exam", "date", "note"]);
  const [tableContentsTitle] = useState(["Exam", "Date"]);
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topicUrl] = useState(process.env.REACT_APP_EXAMS);

  const navigate = useNavigate();
  let { user, setUser } = useUser();

  useEffect(() => {
    const userStored = sessionStorage.getItem("user");
    const userStoredOb = userStored && JSON.parse(userStored);

    setStoredUser(userStoredOb);
    if (user || userStoredOb) {
      axios
        .get(topicUrl)
        .then((res) => {
          findTestByStudentId(
            res.data,
            (user || userStoredOb).id,
            userStoredOb
          );
        })
        .catch((er) => {
          setErrorMessage(er.message);
          if (er.response) {
            console.log(er.response.data);
          }
          if (er.request) {
            console.log(er.request);
          } else {
            console.log(er.message);
          }
        });
      if ((user || userStoredOb) && (user || userStoredOb).scores) {
        convertUserToArra((user || userStoredOb).scores);
      }
    }
    setLoading(false);
  }, [user]);
  if (loading) {
    return <CircularColor />;
  }

  if (!user && !storedUser) {
    return <Navigate to={"/login"} replace />;
  }
  const handeNotif = () => {
    exist.length > 0 && setShowNotif(!showNotif);
  };
  function findTestByStudentId(tests, studentId, stdUser) {
    let theTesterObj = [];
    for (const test of tests) {
      if (
        test.students.includes(studentId) &&
        typeof stdUser["scores"][test.name] !== "object"
      ) {
        theTesterObj = [...theTesterObj, test];
      }
    }
    setExist(theTesterObj);
  }

  const handleLogout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate("/login");
  };
  const startTest = (id) => {
    navigate("/student/test", { state: id });
  };

  function convertUserToArra(obj) {
    const result = [];
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const newObj = { exam: key };
        for (let nestedKey in obj[key]) {
          if (nestedKey === "date") {
            newObj[nestedKey] = moment(obj[key][nestedKey]).format(
              "MM-DD-YYYY hh:mm"
            );
          } else {
            newObj[nestedKey] = obj[key][nestedKey];
          }
        }
        result.push(newObj);
      }
    }
    setScores(result);
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          m: "30px 100px 0",
          display: { sm: "none", lg: "block", xs: "none" },
        }}
      >
        <Box variant="h6" display={"flex"} alignItems={"center"} gap={1}>
          <Avatar
            src="https://i.ibb.co/MG8PFFh/22-223941-transparent-avatar-png-male-avatar-icon-transparent-png.png"
            sx={{
              width: 30,
              height: 30,
              border: "5px solid #fff",
            }}
          ></Avatar>
          {(user || storedUser).name}
        </Box>
      </Box>
      <Box sx={panelControl}>
        <Box
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={handeNotif}
        >
          <NotificationsOutlinedIcon />
          <Box sx={{ ...numOfNotif, display: exist.length ? "block" : "none" }}>
            {exist.length}
          </Box>
          {exist.length > 0 && showNotif && (
            <ListNotification
              list={list}
              exist={exist}
              startTest={startTest}
              errorMessage={errorMessage}
            />
          )}
        </Box>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
      <Layout>
        <StudentsNotes
          title="Notes"
          tbct={tableContentsTitle}
          tableKeys={tableKeys}
          data={scores}
          notes="Notes"
        />
      </Layout>
    </Box>
  );
}

export default Account;
