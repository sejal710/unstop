
import Train from "./Components/Train"
import './App.sass'
import Navbar from "./Components/Navbar"
import React,{useState,useEffect} from "react"
import Reset from "./Components/Reset"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [data,setData] = useState([])

  async function getData(){
    let api = await fetch("http://localhost:8080/seats");
    let fetched = await api.json()
    setData(fetched)
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar getData={getData}/>
      <Train data={data} />
      <Reset getData={getData}/>
    </div>
  )
}

export default App
