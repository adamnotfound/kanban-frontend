import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function StatusDropdown({ task, onChange }) {
  const allStatus = [
    "ToDo",
    "InProgress",
    "Blocked",
    "InQA",
    "Done",
    "Deployed",
  ];

  return (
    <TextField
      value={task.status}
      onChange={onChange}
      name="status"
      select // tell TextField to render select
      label="Status"
    >
      {allStatus.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default StatusDropdown;
