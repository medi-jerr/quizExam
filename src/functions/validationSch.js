import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
});

export default validationSchema;
