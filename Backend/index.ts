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
        seats.push({ seatNumber: i, isBooked: false });
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


app.get("/seats", async (req: Request, res: Response) => {
  try {
    const { isBooked } = req.query;
    let query = {};

    if (isBooked) {
      query = { isBooked: isBooked === "true" };
    }

    let data = await SeatModel.find(query);
      data = data.sort((a,b) => a.seatNumber - b.seatNumber)
    res.send(data);
  } catch (e: any) {
    res.send({ Message: e.message });
  }
});



app.patch("/seats/reset", async (req: Request, res: Response) => {
  try {
    await SeatModel.updateMany({}, { $set: { isBooked: false,name:"" } });
    return res.json({ Message:"Reset the Tickets" });
  } catch (error: any) {
    console.error("Error resetting seats:", error);
    return res.status(500).json({ error: "An error occurred while resetting seats." });
  }
});



app.patch('/seats', async (req: Request, res: Response) => {
  const { seats, name } = req.body;

  try {
    if(seats > 7){
      res.send({SeatBooked:"Sorry please book less then 7 only"});
      return ;
    }
    const availableSeats = await SeatModel.aggregate([
      { $match: { isBooked: false } },
      { $addFields: { seatNumber: { $toInt: "$seatNumber" } } },
      { $sort: { seatNumber: 1 } }
    ]);
    if(availableSeats.length === 0){
      res.send({SeatNumber:"Sorry Seats are not available"})
    }
    let bookedSeats: string[] = [];
    let seatsBook: number[] = []

    if(seats === 0 && availableSeats.length !== 0){
      bookedSeats.push(availableSeats[0]._id);
      seatsBook.push(availableSeats[0].seatNumber);
    }
    else{
    let k = 1, index = 0;
    for (let i = 1; i <= 12; i++) {
      let count = 1;
      let length = i === 12 ? 3 : 7;
      bookedSeats = [];
      seatsBook = []
      for (let j = 1; j <= length; j++) {
        if(count > seats){
          break;
        }
        if (availableSeats[index] !== undefined && availableSeats[index].seatNumber === k ) {
          bookedSeats.push(availableSeats[index]._id);
          seatsBook.push(availableSeats[index].seatNumber);
          index++;
          count++;
        }
        k++;
      }
      
      if (count > seats) {
        console.log(count,"count")
        break;
      }
    }
     let count =1;
    if(bookedSeats.length === 0){
      for(let i=1;i<=80;i++){
        if(seats > count) break;
        if(availableSeats[i] !== undefined && count <= seats){
          bookedSeats.push(availableSeats[i]._id);
          seatsBook.push(availableSeats[i].seatNumber)
          count++;
        }
      }
      if(bookedSeats.length === 0){
        res.send({SeatNumber :"Not Available"});
        return ;
      }
    }
   }
    
    const result = await SeatModel.updateMany(
      { _id: { $in: bookedSeats } },
      { $set: { isBooked: true, name } }
    );
     
    res.json({ SeatNumber: seatsBook.join(" ")});
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