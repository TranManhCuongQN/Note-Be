import Section from "../models/section.model.js";
import Task from "../models/task.model.js";

export const createSection = async (req, res) => {
  const { boardId } = req.params;
  try {
    const section = await Section.create({ board: boardId });
    section._doc.tasks = [];
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const updateSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    section._doc.tasks = [];

    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const deleteSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.deleteOne({ _id: sectionId });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
