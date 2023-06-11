
import React from 'react';
import { toast } from 'react-toastify';
import '../Sass/Reset.sass'

interface ResetProps{
  getData :() => void
}

const Reset:React.FC<ResetProps > = ({getData}) => {
    const handleReset = () => {
        fetch(`http://localhost:8080/seats/reset`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
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
          getData()
          toast.success(data.Message)
          // Handle the response data or perform additional operations
        })
        .catch(error => {
          console.error(error);
          toast.error("Opps not booked")
          // Handle the error
        });
    }
  return (
    <button onClick={handleReset}> Reset</button>
  );
};

export default Reset;