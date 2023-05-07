import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null }
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const rentalSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  rentalDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null }
});

export const Customer = mongoose.model('Customer', customerSchema);
export const Movie = mongoose.model('Movie', movieSchema);
export const Rental = mongoose.model('Rental', rentalSchema);
