import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CreateExamC({
  nQuestions,
  nOptions,
  showPP,
  handleClose,
  questions,
  counter,
  handleSubAndNext,
  handleRightAnswer,
  rightAnswer,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm();

  const resetAndSub = (data) => {
    handleSubAndNext(data);
    reset();
  };
  return (
    <Dialog
      open={showPP}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(resetAndSub)}>
        <DialogTitle>{"Write your question and options here"}</DialogTitle>
        <DialogContent>
          {/*  */}
          <Typography>
            Question N°: {counter + 1} / {nQuestions}
          </Typography>
          <Box>
            <TextField
              fullWidth
              label="write your question here"
              required
              {...register("text")}
            />
          </Box>
          <Grid container spacing={1} marginTop={0.5} marginBottom={2}>
            {Array.apply(null, { length: nOptions }).map((it, i) => (
              <Grid item xs={6} key={i}>
                <TextField
                  fullWidth
                  label="write option"
                  required
                  {...register("option" + i)}
                  InputProps={{
                    endAdornment: (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => handleRightAnswer(i)}
                            checked={rightAnswer === i}
                          />
                        }
                      />
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" disabled={rightAnswer == null}>
            {nQuestions <= counter + 1 ? "Done" : "Next"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateExamC;
