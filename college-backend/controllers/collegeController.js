import College from "../models/College.js";

// @desc    Get all colleges
// @route   GET /api/colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Add a new college
// @route   POST /api/colleges
export const addCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: "Error adding college", error: error.message });
  }
};

// @desc    Get a single college by ID
// @route   GET /api/colleges/:id
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: "Error fetching college", error: error.message });
  }
};

// @desc    Search colleges by state, type, or name
// @route   GET /api/colleges/search
export const searchColleges = async (req, res) => {
  const { state, type, name } = req.query;

  const filter = {};
  if (state) filter.state = new RegExp(state, "i");
  if (type) filter.type = new RegExp(type, "i");
  if (name) filter.name = new RegExp(name, "i");

  try {
    const colleges = await College.find(filter);
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};
