import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function SubmitButt({ thePath, text, isDisbled = false, onsub }) {
  const navigate = useNavigate();
  return (
    <Button
      disabled={isDisbled}
      onClick={() => {
        onsub && onsub();
        navigate(thePath);
      }}
      sx={{
        position: "sticky",
        display: "block",
        bottom: "0px",
        left: "50%",
        right: "50%",
        top: "100%",
        transform: "translateX(-50%)",
        backgroundColor: "light",
        borderRadius: "50px",
        minWidth: "200px",
      }}
      variant="contained"
    >
      {text}
    </Button>
  );
}

export default SubmitButt;
