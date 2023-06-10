

import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISeat extends Document {
  seatNumber: string;
  isBooked: boolean;
}

export const seatSchema: Schema<ISeat> = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return parseInt(value) >= 1 && parseInt(value) <= 80;
        },
        message: "Seat number must be between 1 and 80",
      },
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

seatSchema.statics.createSeats = async function (this: Model<ISeat>) {
  try {
    const seats = [];
    for (let i = 1; i <= 80; i++) {
      seats.push({ seatNumber: i.toString(), isBooked: false });
    }
    await this.insertMany(seats);
    console.log("Seats created successfully.");
  } catch (error) {
    console.error("Error creating seats:", error);
  }
};

export const SeatModel: Model<ISeat> = mongoose.model<ISeat>("Seat", seatSchema);

