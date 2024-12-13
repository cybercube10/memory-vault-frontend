import React from 'react' 
import axios from 'axios'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
  
  const [email,setEmail] = useState('')
  const[password,setPassword] = useState('') 
  const navigate = useNavigate() 

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/users/login',{email,password})
      
      if(response.data.success){
        localStorage.setItem('token',response.data.token) 
        localStorage.setItem('name',response.data.user.name)
        navigate('/')
      }
    } 
    
    
    catch (error) {
      console.log(error.message);
      
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log in</h2>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <button
            type="submit"
           onClick={()=>console.log('hi')}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
           Login
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/register" className="text-indigo-600 hover:underline">
             Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
  
}

export default Login
