import { Paper, styled } from "@mui/material";

export const btnSub = {
  backgroundColor: "light",
  borderRadius: "50px",
  minWidth: "200px",
  marginTop: 0.5,
};

export const AuthBoard = styled(Paper)(({ theme }) => ({
  width: "700px",
  height: "500px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "98vh",
    marginTop: "1vh",
  },
}));

export const WelcomComp = styled(Paper)(({ theme }) => ({
  borderRadius: "0 20px 20px 0",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const cnt = {
  display: "flex",
  justifyContent: "center",
};
