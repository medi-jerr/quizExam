import React, { useEffect, useState } from "react";
import LogAndRegister from "../../components/LogAndRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../functions/UserContext";

function StLogin() {
  const [students, setStudents] = useState([]);
  const [authInfo, setAuthInfo] = useState({});
  const [messageOfNotExist, setMessageOfNotExist] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    if (students.length > 0 && authInfo.name && authInfo.password) {
      let user = students.find(
        (item) =>
          item.name === authInfo.name && item.password === authInfo.password
      );
      if (!user) {
        setMessageOfNotExist(true);
      } else {
        setUser(user);
        navigate("/account");
      }
    }
  }, [students, authInfo]);

  const callbackFun = async (authIfo) => {
    setAuthInfo(authIfo);
    await getTheUserFromDb(authIfo);
  };
  const getTheUserFromDb = () => {
    axios.get("http://localhost:5000/students").then((res) => {
      setStudents(res.data);
    });
  };

  return (
    <>
      <LogAndRegister
        page="Login"
        text="creat account"
        switcher="register"
        handleSub={callbackFun}
        errors={{ messageOfNotExist: messageOfNotExist }}
      />
    </>
  );
}

export default StLogin;
