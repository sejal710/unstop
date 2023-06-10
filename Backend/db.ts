import mongoose, { Connection } from "mongoose";
import { Request, Response } from "express";
require("dotenv").config();

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.API!)
    console.log("MongoDB database connection established successfully.");
  } catch (error:any) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export const connection: Connection = mongoose.connection;

