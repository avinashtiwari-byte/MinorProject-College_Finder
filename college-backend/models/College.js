import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Government", "Private", "Deemed", "Autonomous"],
    default: "Private",
  },
  established: {
    type: Number,
  },
  courses: {
    type: [String],
  },
  ranking: {
    type: Number,
  },
  website: {
    type: String,
  },
});

const College = mongoose.model("College", collegeSchema);
export default College;
