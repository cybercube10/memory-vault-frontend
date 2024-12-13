import { useState } from 'react'
import Signup from './pages/Signup' 
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './private/PrivateRoute'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
 <Routes>
 <Route path="/" element={<PrivateRoute element={Home} />} />

  <Route path='/register' element={<Signup/>}> </Route>
 <Route path='/login' element={<Login/>}></Route>
 </Routes>
 
    </BrowserRouter>
  )
}

export default App
