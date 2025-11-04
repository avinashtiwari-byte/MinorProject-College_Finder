import express from "express";
import {
  getColleges,
  addCollege,
  getCollegeById,
  searchColleges,
} from "../controllers/collegeController.js";

const router = express.Router();

router.get("/", getColleges);
router.post("/", addCollege);
router.get("/search", searchColleges);
router.get("/:id", getCollegeById);

export default router;
