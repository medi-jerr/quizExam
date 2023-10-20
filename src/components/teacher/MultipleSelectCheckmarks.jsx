import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { memo } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectCheckmarks = memo(
  ({ students = [], personName, handleChangeSelect }) => {
    return (
      <div>
        <FormControl sx={{ mt: 1, width: "100%" }} required>
          <InputLabel sx={{ width: "80px" }} id="demo-multiple-checkbox-label">
            students
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName.map((obj) => obj.name)}
            onChange={handleChangeSelect}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {students &&
              students.length &&
              students.map((name, i) => (
                <MenuItem key={i} value={name.name}>
                  <Checkbox
                    checked={personName.some((obj) => obj.name === name.name)}
                  />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);
