import '../Sass/Train.sass';
import Seat from './Seat';
import React from 'react';

interface TrainData {
  // Define the structure of each data object
  _id: string;
  name: string;
  isBooked : boolean;
  seatNumber : number;
}

interface TrainProps {
  data: TrainData[];
}
const Train: React.FC<TrainProps>= ({data}) => {
  

  return (
    <div className='head'>
     <div className="train">
      <div className="engine"></div>
     <div className="carriages">
        {data && data.map((el,i) => {
          return(
          <Seat key={i} data={el}  />
        )})}
      </div>
    </div> 
    </div>
  );
};

export default Train;

