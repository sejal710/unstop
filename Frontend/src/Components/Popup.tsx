import React,{useState} from 'react';
import '../Sass/Popup.sass'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface PopupProps {
    setpopup: (value: boolean) => void;
    getData : () => void
  }

const Popup: React.FC<PopupProps> = ({setpopup,getData}) => {
    const [name,setName] = useState("")
    const [seats,setSeats] = useState(0)
    const arr = [1,2,3,4,5,6,7];
    const closePopup = () => {
        setpopup(false)
    }
    const handleSubmit = (e : any) => {
      e.preventDefault();
      const value ={name:name,seats:seats}
      fetch(`http://localhost:8080/seats`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
           toast.error("Opps not booked")
          }
        })
        .then(data => {
          console.log('Seat updated successfully:', data);
          getData();
          toast.success(data.SeatNumber)
          // Handle the response data or perform additional operations
        })
        .catch(error => {
          console.error(error);
          toast.error("Opps not booked")
          // Handle the error
        });
        setpopup(false)
    }
  return (
    <div className="popup">
    <div className="popup-content">
      <button className="popup-close" onClick={closePopup}>
      <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="popup-close-icon"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
      </button>
      <form className="popup-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        <select onChange={(e) => setSeats(Number(e.target.value))}>
          {
            arr && arr.map((el,i) => (
              <option value={el} key={i}>Number of seat is {el}</option>
            ))
          }
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default Popup;