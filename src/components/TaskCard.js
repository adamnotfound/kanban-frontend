import React from "react";

const TaskCard = ({ handleOpen, task }) => {
  return (
    <div
      onClick={(e) => handleOpen(task)}
      className="bg-white-100 border border-grey-500 rounded-lg shadow-md p-7 m-3"
    >
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-gray-600 text-lg truncate  w-[300px]">
        {task.description}
      </p>
    </div>
  );
};

export default TaskCard;
