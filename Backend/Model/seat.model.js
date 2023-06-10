
const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value >= 1 && value <= 80;
      },
      message: 'Seat number must be between 1 and 80',
    },
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
},{
    versionKey:false
})

seatSchema.statics.createSeats = async function () {
  try {
    const seats = [];
    for (let i = 1; i <= 80; i++) {
      seats.push({ seatNumber: i, isBooked: false }); 
    }
    await this.insertMany(seats);
    console.log('Seats created successfully.');
  } catch (error) {
    console.error('Error creating seats:', error);
  }
};


const seatModel = mongoose.model("seat",seatSchema);

module.exports = {seatModel,seatSchema};