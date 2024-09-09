import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({
  status,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTaskStatusChange,
  onTaskSelect,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onTaskStatusChange(item.id, status),
  }));

  return (
    <div ref={drop} className="bg-white rounded-2xl shadow-md overflow-hidden">
      <h3
        className={`text-lg font-semibold p-4 text-white text-center  ${
          status === "TODO"
            ? "bg-purple-600" : status === "IN PROGRESS"
            ? "bg-yellow-500 !text-black"
            : "bg-green-500"
        }`}
      >
        {status}
      </h3>
      <div className="p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
            onStatusChange={onTaskStatusChange}
            onSelect={onTaskSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
