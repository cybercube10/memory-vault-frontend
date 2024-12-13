import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function TaskModal({ closeModal, addTask , currentTask,updateTask}) {  // Receive addTask as a prop
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline,setDeadline] = useState('tba')
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentTask){
      updateTask(currentTask._id,title,priority,deadline)
    }
    else{
      addTask(title, priority,deadline); 
    } 
   
  };

  useEffect(()=>{
    if(currentTask){
      setTitle(currentTask.title)
      setPriority(currentTask.priority)
      setDeadline(currentTask.deadline)
    }
  },[currentTask])
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}  // Use closeModal to close the modal
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">&times;</span>
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-bold mb-4">{ currentTask? 'Edit Task' :'Add Task'}</h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <input
            type="text"
            value={title}  // Bind the value to `title`
            onChange={(e) => setTitle(e.target.value)}  // Update `title` on change
            className="border border-gray-300 rounded-lg w-full p-2 mb-4"
            placeholder="Enter task name"
            required
          />

          {/* Priority Input */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select> 

          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium mb-2">
              Deadline:
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2"
              min={today}
            />
          </div>


          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"  // Submit form
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
             { currentTask? 'Update':'Add'}
            </button>
          
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal; 
 



