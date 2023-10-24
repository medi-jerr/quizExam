import React, { useState } from "react";
import LogAndRegister from "../../components/auth";
import axios from "axios";
import validationSchema from "../../functions/validationSch";
import { useNavigate } from "react-router-dom";

function StRegister() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e, ob) => {
    e.preventDefault();
    validationSchema
      .validate(ob, { abortEarly: false })
      .then(() => {
        axios
          .post(process.env.REACT_APP_STUDENTS, {
            ...ob,
            id: Date.now(),
            scores: {},
          })
          .then((res) => console.log(res.data))
          .catch((er) => console.log(er.massage));

        setErrors({});
        setSubmitted(true);
        navigate("/login");
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        setSubmitted(false);
      });
  };

  return (
    <>
      <LogAndRegister
        page="Register"
        text="you have an account"
        switcher="login"
        handleSub={registerUser}
        errors={errors}
      />
    </>
  );
}

export default StRegister;
