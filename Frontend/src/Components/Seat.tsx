import React from 'react'
import '../Sass/Seat.sass'
interface SeatProps {
    data : { seatNumber: number; name: string ,isBooked:boolean};
}

const Seat : React.FC<SeatProps> = ({data}) => {
  
  const availabilityClass = data.isBooked ? 'available' : 'unavailable';
  return(
    <div className={`seat ${availabilityClass}`}>
    <span className='seat-number'>{data.seatNumber}</span>
    <span className='seat-name'>{data.name}</span>
  </div>
  )
}

export default Seat;