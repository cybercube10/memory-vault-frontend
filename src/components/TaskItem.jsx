import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskItem = ({ task, onEdit, deleteTask }) => {
  // Get background color classes based on priority
  const getBgColorClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-600 text-white font-semibold'; // Red for High priority
      case 'Medium':
        return 'bg-orange-300 text-gray-800 font-semibold'; // Yellow for Medium priority
      case 'Low':
        return 'bg-green-600 text-gray-800 font-semibold'; // Green for Low priority
      default:
        return 'bg-gray-200 text-gray-800'; // Default gray
    }
  };

  // Format deadline date
  const formatDate = (date) => {
    if (!date) return 'No Deadline';
    const options = { day: 'numeric', month: 'short', year: 'numeric' }; // E.g., "4 Dec 2024"
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <tr className="border-b text-center bg-white">
      {/* Task Title */}
      <td className="p-4 border-r">{task.title}</td>

      {/* Deadline */}
      <td className="p-4 border-r">
        <span className="inline-block px-3 py-1 rounded">
          {formatDate(task.deadline)}
        </span>
      </td>

      {/* Priority */}
      <td className="p-4 border-r">
        <span className={`inline-block px-3  ${getBgColorClass(task.priority)}`}>
          {task.priority}
        </span>
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex justify-center space-x-4">
          <button
            className="text-blue-700 hover:text-blue-700"
            onClick={() => onEdit(task)}
            aria-label="Edit Task"
          >
            <FaEdit />
          </button>
          <button
            className="text-red-900 hover:text-red-700"
            onClick={() => deleteTask(task._id)}
            aria-label="Delete Task"
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
