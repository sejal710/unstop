
import Train from "./Components/Train"
import './App.sass'
import Navbar from "./Components/Navbar"
import React,{useState,useEffect} from "react"
import Reset from "./Components/Reset"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Components/Loading"

const App: React.FC = () => {
  const [data,setData] = useState([])

  async function getData(){
    let api = await fetch(`https://unstop-iq6m.vercel.app/seats`);
    let fetched = await api.json()
    setData(fetched)
  }
  useEffect(()=>{
    getData();
  },[])
  if(data.length === 0){
    return <Loading />
  }
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar getData={getData}/>
      <Train data={data} />
      <Reset getData={getData}/>
      <h1 className="app_h1">Created By Sejal Jaiswal🧡🧡🧡</h1>
    </div>
  )
}

export default App
