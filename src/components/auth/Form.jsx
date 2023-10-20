import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import React from "react";
import { btnSub } from "../../styles/auth";

function Form({ handleSub, handleChange, errors, page, info }) {
  return (
    <form onSubmit={(e) => handleSub(e, info)} style={{ textAlign: "center" }}>
      <FormControl sx={{ m: 0.5, width: "100%" }} variant="outlined">
        <OutlinedInput
          required
          autoComplete="off"
          onChange={handleChange}
          name="name"
          placeholder="user name"
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 0.5, width: "100%" }} variant="outlined">
        <OutlinedInput
          required
          autoComplete="off"
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="password"
          id="outlined-adornment-weight"
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
      {errors.messageOfNotExist && (
        <Box className="error" color="red" fontSize={14}>
          Invalid email or password.
        </Box>
      )}
      {errors.password && (
        <Box className="error" color="red" fontSize={14}>
          {errors.password}
        </Box>
      )}
      <Button sx={btnSub} variant="contained" type="submit">
        {page}
      </Button>
    </form>
  );
}

export default Form;
