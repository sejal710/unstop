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
    await SeatModel.updateMany({}, { $set: { isBooked: false,name:"" } });
    return res.json({ message: "All seats reset to false." });
  } catch (error: any) {
    console.error("Error resetting seats:", error);
    return res.status(500).json({ error: "An error occurred while resetting seats." });
  }
});


// app.patch('/seats', async (req: Request, res: Response) => {
//   const { seats, name } = req.body;

//   try {
//     // const availableSeats = await SeatModel.find({ isBooked: false }).sort("seatNumber").lean();
//     const availableSeats = await SeatModel.aggregate([
//       { $match: { isBooked: false } },
//       { $addFields: { seatNumber: { $toInt: "$seatNumber" } } },
//       { $sort: { seatNumber: 1 } }
//     ]);
//     let k = 1,index=0;
//     let bookedSeats : number[] = []
//     for(let i=1;i<=12;i++){
//       let count = 0;
//       let length = i == 12 ? 3 : 7;
//       bookedSeats = [];
//       for(let j=1;j<=length;j++){
        
//         if(availableSeats[index] !== undefined && availableSeats[index].seatNumber == k && count <= seats){
//           bookedSeats.push(availableSeats[index]._id)
//           count++;
//         }
//         k++;
//         index++;
//       }
//       if(count >= seats){
//           break;
//       }
//       }
//       console.log(count);
      
//     }
//     res.send(bookedSeat)
//   } 
//   catch (error: any) {
//     console.error('Error booking seats:', error);
//     return res.status(500).json({ error: 'An error occurred while booking the seats.' });
//   }
// });


app.patch('/seats', async (req: Request, res: Response) => {
  const { seats, name } = req.body;

  try {
    const availableSeats = await SeatModel.aggregate([
      { $match: { isBooked: false } },
      { $addFields: { seatNumber: { $toInt: "$seatNumber" } } },
      { $sort: { seatNumber: 1 } }
    ]);

    let k = 1, index = 0;
    let bookedSeats: any[] = [];
    let seatsBook: number[] = []
    for (let i = 1; i <= 12; i++) {
      let count = 1;
      let length = i === 12 ? 3 : 7;
      bookedSeats = [];
      seatsBook = []
      for (let j = 1; j <= length; j++) {
        
        if (availableSeats[index] !== undefined && availableSeats[index].seatNumber === k && count <= seats) {
          bookedSeats.push(availableSeats[index]._id);
          seatsBook.push(availableSeats[index].seatNumber);
          index++;
          count++;
        }
        if(count > seats){
          break;
        }
        k++;
      }
      console.log(count,"count")
      if (count >= seats) {
        break;
      }
    }

    if(bookedSeats.length === 0){
      for(let i=1;i<=80;i++){
        if(availableSeats[i] !== undefined){
          bookedSeats.push(availableSeats[i]._id);
          seatsBook.push(availableSeats[i].seatNumber)
        }
      }
      if(bookedSeats.length === 0){
        res.send({SeatNumber :"Not Available"});
        return ;
      }
    }
    // Update the documents
    const result = await SeatModel.updateMany(
      { _id: { $in: bookedSeats } },
      { $set: { isBooked: true, name } }
    );
    console.log(result)

    res.json({ SeatNumber: seatsBook});
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