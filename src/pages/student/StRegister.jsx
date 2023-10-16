import React, { useState } from "react";
import LogAndRegister from "../../components/LogAndRegister";
import axios from "axios";
import validationSchema from "../../functions/validationSch";
import { useId } from "react";
import { useNavigate } from "react-router-dom";

function StRegister() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const registerUser = (ob) => {
    validationSchema
      .validate(ob, { abortEarly: false })
      .then(() => {
        axios
          .post("http://localhost:5000/students", { ...ob, id: Date.now() })
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
  console.log(errors);
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
