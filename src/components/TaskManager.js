import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  selectTasks,
  showModal,
  closeModal,
  selectShow,
} from "../reducers/task.reducer";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const show = useSelector(selectShow);
  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="w-full bg-indigo-200 p-3 border-b border-indigo-200">
        <button className="text-lg" onClick={(e) => dispatch(showModal())}>
          Create new task
        </button>
      </div>
      <div style={{ height: "90vh", overflow: "scroll" }}>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <TaskModal open={show} handleClose={(e) => dispatch(closeModal())} />
          {tasks?.map((task) => (
            <TaskCard
              handleOpen={(e) => dispatch(showModal(e))}
              task={task}
              key={task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
