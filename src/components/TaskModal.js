import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UsersDropdown from "./UsersDropdown";
import StatusDropdown from "./StatusDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setTask,
  selectTask,
  selectUsers,
  submitTask,
  selectLoading,
  setErr,
  selectError,
} from "../reducers/task.reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
export default function BasicModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const task = useSelector(selectTask);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleChange = (e) => {
    dispatch(setErr(null));
    dispatch(setTask({ ...task, [e.target.name]: e.target.value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(submitTask(task));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={submitForm} style={styles.form}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              fullWidth
              value={task.title}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              fullWidth
              multiline
              value={task.description}
              onChange={handleChange}
            />
            <UsersDropdown
              users={users}
              assignee={task.assignedTo}
              onAssigneeChange={handleChange}
            />
            <StatusDropdown task={task} onChange={handleChange} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit Task"}
            </Button>
            <p className="text-red-800 text-center">{error}</p>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
