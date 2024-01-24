import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './routes/Login';


function App() {
  return (
    <>
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Login></Login>
      <Outlet></Outlet>
    </div>

      
    </>
  )
}

export default App
