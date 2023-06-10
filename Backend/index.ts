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

app.get("/seats",async(req: Request,res: Response) => {
  try{
    const { isBooked } = req.query;
    let query = {};

    if (isBooked) {
      query = { isBooked: isBooked === "true" };
    }
    let data = await SeatModel.find(query);
    res.send(data)
  }
  catch(e: any){
    res.send({Message:e.message})
  }
})

app.patch("/seats/reset", async (req: Request, res: Response) => {
  try {
    await SeatModel.updateMany({}, { $set: { isBooked: false } });
    return res.json({ message: "All seats reset to false." });
  } catch (error: any) {
    console.error("Error resetting seats:", error);
    return res.status(500).json({ error: "An error occurred while resetting seats." });
  }
});

app.patch('/seats', async (req: Request, res: Response) => {
  const seatNumbers = req.body.seats;

  try {
    const bookedSeats: string[] = [];

    for (const seatNumber of seatNumbers) {
      
      const seat = await SeatModel.findOne({ seatNumber });

     
      if (!seat) {
        return res.status(404).json({ error: `Seat ${seatNumber} not found.` });
      }

      
      if (seat.isBooked) {
        return res.status(400).json({ error: `Seat ${seatNumber} is already booked.` });
      }

      
      seat.isBooked = true;
      await seat.save();

      
      bookedSeats.push(seatNumber);
    }

    return res.json({ message: `Seats ${bookedSeats.join(', ')} have been booked successfully.` });
  } catch (error: any) {
    console.error('Error booking seats:', error);
    return res.status(500).json({ error: 'An error occurred while booking the seats.' });
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