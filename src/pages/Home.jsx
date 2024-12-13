import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import CalenderWidget from '../components/CalenderWidget';
import PomodoroTimer from '../components/PomodoroTimer';
import axios from 'axios';
import MemoriesGrid from '../components/MemoriesGrid';
import { IoIosAddCircle } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import { FiLogOut} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import ProfileManager from '../components/ProfileManager'
const DigitalNumber = ({ number }) => {
  return (
    <div className="flex items-center justify-center w-12 h-16 bg-gray-900 rounded-lg text-2xl font-bold text-white">
      {number}
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <div className="flex items-center justify-center gap-1">
      <DigitalNumber number={Math.floor(hours / 10)} />
      <DigitalNumber number={hours % 10} />
      <div className="text-2xl font-bold text-gray-800">:</div>
      <DigitalNumber number={Math.floor(minutes / 10)} />
      <DigitalNumber number={minutes % 10} />
      
    </div>
  );
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };



  const fetchTask = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/task/mytask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        const sortedTasks = (response.data.task || []).sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
        });
  
        setTasks(sortedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title, priority,deadline) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/task/add',
        { title, priority,deadline },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        closeModal();
        fetchTask();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, title, priority,deadline) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/task/update/${id}`,
        { title, priority },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        closeModal();
        fetchTask();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/task/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        fetchTask();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onEdit = (task) => {
    setCurrentTask(task);
    openModal();
  };
  const [greeting, setGreeting] = useState('');
  
  // Function to determine the greeting message based on the current hour
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  };

  const[username,setUsername] = useState(null)

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };



  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      const formattedName = capitalizeFirstLetter(storedName);
      setUsername(formattedName);
    }


    fetchTask();
    getGreeting();
  }, []);







 // logout 

 const navigate = useNavigate();
  // ... (rest of your existing state and functions)

  const handleLogout = () => {
    // Clear all authentication-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('userThought');
    
    // Redirect to login page
    navigate('/login');
  };

  // pfp-section 
  const { profilePicture, loading, error, handleProfilePicUpload } = ProfileManager();





  return (
    <div className="flex flex-col  max-h-screen">
      {isModalOpen && (
        <TaskModal
          closeModal={closeModal}
          addTask={addTask}
          currentTask={currentTask}
          updateTask={updateTask}
        />
      )}

       {/* Banner Section */}
<div className="h-48 bg-gray-900 relative" >
<div className="absolute -bottom-10 left-10 w-24 h-24 bg-gray-200 rounded-full border-4 border-white overflow-hidden relative">
    {profilePicture ? (
      <img 
        src={profilePicture} 
        alt="Profile" 
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
        {/* You can add a default avatar icon here */}
        <span className="text-gray-500">No Image</span>
      </div>
    )}
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleProfilePicUpload}
      className="absolute inset-0 opacity-0 cursor-pointer z-10"
      disabled={loading}
    />
    {loading && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
      </div>
    )}
  </div>
  </div>
  {error && (
    <div className="absolute bottom-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
      {error}
    </div>
  )}
    




      {/* Quote Section */}
      <div className="text-center my-2 text-gray-600 italic">
  <span
    className="relative  px-2 py-1 inline-flex items-center justify-between"
    style={{
      background: "linear-gradient(120deg, #8B0000, #B22222)", // Dark red tones
      borderRadius: "4px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1), 0 0 0 3px #8B0000",
      transform: "rotate(-1deg)",
      color: "white", // Ensures text is readable
    }}
  >
    MemoryVault    <IoHeartCircleOutline className='
    mx-1' />
   
  </span>
  <button onClick={handleLogout}  className="px-4 py-2 text-black rounded-lg "
      title="Logout"><FiLogOut/></button>
</div>



      {/* Main Content */}
      <div className="flex gap-4 p-4 h-screen">
        {/* Left Column */}
        <div className="w-1/4 flex flex-col gap-4">
        <div className=" flex flex-col flex-1 rounded-lg ">
  <div className=" h-3/4 w-full rounded-t-lg flex items-center justify-center">
  <div className="border-dashed border border-black flex h-3/4 w-1/2 items-center justify-center relative">
    {profilePicture ? (
      <img
        src={profilePicture}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-500">Click to add photo</span>
      </div>
    )}
    <label className="absolute inset-0 cursor-pointer">
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        className="hidden"
        disabled={loading}
      />
    </label>
    {loading && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )}
  </div>


  {error && (
    <div className="absolute bottom-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
      {error}
    </div>
  )}


 
  </div>
 
</div>

          <div className=" flex flex-col rounded-lg  p-4">
  {/* Top Div */}
  <div className="border-b-2 italic text-xl border-black font-light text-center  p-4 mb-4 flex-[1]  text-gray-900">
   Pomodoro Timer
  </div>

  <div className="bg-[#BA0021] shadow-md rounded-lg p-4 flex-[2] ">
   <PomodoroTimer />
  </div>
</div>

        </div>

        {/* Middle Column */}
        <div className="w-2/4 flex flex-col gap-6">

        <div className=" flex-1 rounded-lg  p-4 mb-4">
  
<h2 className="text-2xl font-light italic mb-6 border-black border-b-2 ">memories</h2>

  {/* Scrollable Memories Section */}
  <div className="overflow-y-auto max-h-60">
    <MemoriesGrid />
  </div>
      
          
          <div className=" flex-1 rounded-lg bg-white shadow-md  p-4">
  {/* Fixed Heading */}
  <h2 className="font-light  text-gray-800 mb-2 font-light italic text-xl border-black border-b-2  text-center">
    <span>
    Activities 📌  <button
      className="px-4 text-black rounded-lg flex text-2xl items-center space-x-2"
      title="Add Task" 
      onClick={openModal}
    >
     <IoIosAddCircle />

    </button></span>
  </h2>

  {tasks.length > 0 ? (
    <div className="overflow-y-auto max-h-40">
      {/* Table */}
      <table className="table-auto w-full text-left border-collapse">
       
        <thead className="bg-[#BA0021]  text-black sticky top-0 z-10">
          <tr>
            <th className="p-4 ">Task Title</th>
            <th className="p-4">Deadline</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No tasks available</p>
  )}
</div>


</div>


        </div>

        {/* Right Column */}
        <div className="w-1/4 flex flex-col gap-4">
          {/* Digital Clock */}
             
          <div className=" flex-1 rounded-lg  flex flex-col items-center justify-center p-4">
 
            <div className="flex items-center justify-center gap-1 mb-4 px-2">
             <DigitalClock />
              </div>

  
  <div className="text-2xl font-semibold text-gray-800">
    {greeting} , {username}
  </div>

  {/* Favorite Sites */}
  
</div>



          {/* Calendar */}
          <div className=" flex-1 rounded-lg ">
            <CalenderWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
