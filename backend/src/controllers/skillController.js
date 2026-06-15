import Skill from "../models/Skill.js";

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

export const addSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({
      name: req.body.name,
      category: req.body.category,
      level: req.body.level,
      icon: req.body.icon,
      order: req.body.order,
    });

    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        level: req.body.level,
        icon: req.body.icon,
        order: req.body.order,
      },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (error) {
    next(error);
  }
};
