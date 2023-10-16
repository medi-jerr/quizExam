import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { list, numOfNotif, panelControl } from "../../styledCore/account";
import axios from "axios";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import moment from "moment/moment";
import { useUser } from "../../functions/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import StudentsNotes from "../../components/StudentsNotes";

function Account() {
  const [showNotif, setShowNotif] = useState(false);
  const [exams, setExams] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [exist, setExist] = useState([]);
  const [scores, setScores] = useState([]);
  const [tableKeys, setTableKeys] = useState(["exam", "date", "note"]);
  const [tableContentsTitle, setTbCtTl] = useState(["Exam", "Date"]);

  const navigate = useNavigate();
  let { user, setUser } = useUser();

  useEffect(() => {
    axios
      .get("http://localhost:5000/topics")
      .then((res) => {
        setExams(res.data);
        findTestByStudentId(res.data, user.id);
      })
      .catch((er) => setErrorMessage(er.message));
    if (user && user.scores) {
      convertUserToArra(user.scores);
    }
  }, []);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  const handeNotif = () => {
    exist.length > 0 && setShowNotif(!showNotif);
  };
  function findTestByStudentId(tests, studentId) {
    let theTesterObj = [];
    for (const test of tests) {
      if (
        test.students.includes(studentId) &&
        typeof user["scores"][test.name] !== "object"
      ) {
        theTesterObj = [...theTesterObj, test];
      }
    }

    setExist(theTesterObj);
  }

  const handleLogout = () => {
    setUser(null);
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
      <Box sx={{ position: "absolute", top: 0, left: 0, m: "30px 100px 0" }}>
        <Box variant="h6" display={"flex"} alignItems={"center"} gap={1}>
          <Avatar
            src="https://picsum.photos/200/300"
            sx={{
              width: 30,
              height: 30,
              border: "5px solid #fff",
            }}
          ></Avatar>
          {user.name}
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
            <List sx={list}>
              {exist && exist.length ? (
                exist.map((item) => (
                  <ListItem key={item.id} onClick={() => startTest(item.id)}>
                    <ListItemAvatar>
                      <Avatar>
                        <MenuBookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={moment(item.id).format("MM/DD/YYYY")}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SentimentVeryDissatisfiedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={errorMessage} />
                </ListItem>
              )}
            </List>
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
