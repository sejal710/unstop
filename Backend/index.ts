import express,{ Request, Response } from 'express';
import cors from 'cors';
import { connect, connection } from './db';
import { SeatModel,seatSchema } from './Model/seat.model';

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    await connect();
    const seatsExist = await SeatModel.findOne();
    if (!seatsExist) {
      const seats = [];
      for (let i = 1; i <= 80; i++) {
        seats.push({ seatNumber: i.toString(), isBooked: false });
      }
      await SeatModel.collection.insertMany(seats);
      console.log('Seats created successfully.');
    } else {
      console.log('Seats already exist.');
    }
  } catch (error) {
    console.error('Error creating seats:', error);
  }
})();


app.get("/",(req: Request,res: Response):void => {
    res.send("Welcome TO THE HOME PAGE CREATING BY DEAR SEJAL JAISWAL")
})

app.get("/data",async(req: Request,res: Response) => {
  try{
    let data = await SeatModel.find();
    res.send(data)
  }
  catch(e: any){
    res.send({Message:e.message})
  }
})

app.patch('/seats', async (req: Request, res: Response) => {
  const numberOfSeats = req.body.seats;

  try {
    const availableSeats = await SeatModel.find({ isBooked: false }).sort('seatNumber');

    let consecutiveSeatsCount = 0;
    let consecutiveSeatsStartIndex = -1;
    let consecutiveSeatsRow = '';
    let bookedSeats = [];

    for (let i = 0; i < availableSeats.length; i++) {
      const currentSeat = availableSeats[i];
      const previousSeat = availableSeats[i - 1];

      if (previousSeat && previousSeat.seatNumber.charAt(0) === currentSeat.seatNumber.charAt(0)) {
        // Consecutive seat in the same row
        if (consecutiveSeatsCount === 0) {
          // Start of a new consecutive seat range
          consecutiveSeatsStartIndex = i - 1;
          consecutiveSeatsCount = 2;
        } else {
          // Continuation of the consecutive seat range
          consecutiveSeatsCount++;
        }

        if (consecutiveSeatsCount === numberOfSeats) {
          // Found required number of consecutive seats in the same row
          consecutiveSeatsRow = currentSeat.seatNumber.charAt(0);
          break;
        }
      } else {
        // Reset consecutive seat count when the row changes
        consecutiveSeatsCount = 0;
      }
    }

    if (consecutiveSeatsRow) {
      // Book consecutive seats in the same row
      bookedSeats = availableSeats
        .slice(consecutiveSeatsStartIndex, consecutiveSeatsStartIndex + consecutiveSeatsCount)
        .map(seat => seat._id);

      await SeatModel.updateMany({ _id: { $in: bookedSeats } }, { $set: { isBooked: true } });
    } else {
      // Book seats from multiple rows
      const rows = new Set(availableSeats.map(seat => seat.seatNumber.charAt(0)));
      const rowsArray = Array.from(rows);
      let rowIndex = 0;

      while (bookedSeats.length < numberOfSeats && rowIndex < rowsArray.length) {
        const row = rowsArray[rowIndex];
        const rowSeats = availableSeats.filter(seat => seat.seatNumber.charAt(0) === row);

        if (rowSeats.length >= numberOfSeats) {
          // Sufficient consecutive seats available in this row
          bookedSeats = rowSeats.slice(0, numberOfSeats).map(seat => seat._id);
        } else {
          // Insufficient consecutive seats in this row, book available seats
          bookedSeats.push(...rowSeats.map(seat  => seat._id));
        }

        rowIndex++;
      }

      await SeatModel.updateMany({ _id: { $in: bookedSeats } }, { $set: { isBooked: true } });
    }

    return res.json({ message: `${numberOfSeats} seats booked successfully.`, bookedSeats });
  } catch (error: any) {
    console.error('Error booking seats:', error);
    return res.status(500).json({ error: 'An error occurred while booking seats.' });
  }
});



app.listen(process.env.PORT, async(): Promise<void> => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
      await connection;
      console.log("DB is connected");
  } catch (e: any) {
      console.log("Error Message", e.message);
  }
});