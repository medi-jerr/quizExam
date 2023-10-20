import { Box, Typography } from "@mui/material";
import React from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

function InfoBoard({
  handleSub,
  handleChange,
  errors,
  page,
  info,
  text,
  switcher,
}) {
  const navigate = useNavigate();

  return (
    <Box
      item
      sx={{
        padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component={"h6"} textAlign={"center"}>
        {page}
      </Typography>

      {errors.name && (
        <Box className="error" color="red" fontSize={14}>
          {errors.name}
        </Box>
      )}
      <Form
        handleSub={handleSub}
        handleChange={handleChange}
        errors={errors}
        info={info}
        page={page}
      />
      <Box fontSize={14} marginTop={4} textAlign={"center"}>
        {text}.{" "}
        <Typography
          variant="body1"
          component={"span"}
          color={"primary.main"}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/${switcher}`)}
        >
          {switcher}
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoBoard;
