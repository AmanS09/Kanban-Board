import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ChevronDownIcon, Calendar } from "lucide-react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TaskCard = ({ task, onDelete, onStatusChange, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
    setIsDropdownVisible(false);
  };

  return (
    <div
      ref={drag}
      className={`mb-4 last:mb-0 ${
        isDragging ? "opacity-50" : ""
      } border border-neutral-300 rounded-xl p-4`}
    >
      <div className="flex justify-between items-start">
        <div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </span>
          <h3 className="mt-2 text-2xl font-semibold text-gray-800">
            {task.title}
          </h3>
        </div>

        <div className="relative">
          <ChevronDownIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />

          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
              <div
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("TODO")}
              >
                TODO
              </div>
              <div
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("IN PROGRESS")}
              >
                IN PROGRESS
              </div>
              <div
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleStatusChange("COMPLETED")}
              >
                COMPLETED
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>{task.description}</p>
        <hr className="mt-2 border-neutral-300" />
        <div className="flex items-center mt-3 text-gray-500 text-sm">
          <Calendar className="mr-2" size={16} />
          <span>{task.date}</span>
        </div>

        <div className="flex space-x-2 mt-2">
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit Task"
            onClick={() => onSelect(task)}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Task"
            onClick={() => onDelete(task.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
