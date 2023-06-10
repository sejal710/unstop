import '../Sass/Train.sass';

const Train = () => {
  const totalSeats = 80;
  const seats = [];

  // Calculate the number of full rows (each row except the last one)
  const fullRows = Math.floor((totalSeats - 3) / 7);

  // Create the full rows with 7 seats each
  for (let i = 1; i <= fullRows; i++) {
    const rowSeats = [];
    for (let j = 1; j <= 7; j++) {
      rowSeats.push(<div className="seat" key={(i - 1) * 7 + j}>{(i - 1) * 7 + j}</div>);
    }
    seats.push(<div className="row" key={i}>{rowSeats}</div>);
  }

  // Create the last row with 3 seats
  const lastRowSeats = [];
  for (let i = 1; i <= 3; i++) {
    lastRowSeats.push(<div className="seat" key={fullRows * 7 + i}>{fullRows * 7 + i}</div>);
  }
  seats.push(<div className="row last-row" key={fullRows + 1}>{lastRowSeats}</div>);

  return (
    <div className="train">
      <div className="engine"></div>
      <div className="carriages">
        {seats}
      </div>
    </div>
  );
};

export default Train;

