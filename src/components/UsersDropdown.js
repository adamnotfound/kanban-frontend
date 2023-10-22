import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function UsersDropdown({ users, assignee, onAssigneeChange }) {
  return (
    <TextField
      value={assignee}
      onChange={onAssigneeChange}
      name="assignedTo"
      select // tell TextField to render select
      label="Assignee"
    >
      {users.map((user) => (
        <MenuItem key={user.id} value={user.id}>
          {user.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default UsersDropdown;
