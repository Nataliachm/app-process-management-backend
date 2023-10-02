const Defendant = require("./defendant.model");
const { updateRelations } = require("../../utils.js");

const {
  createDefendant,
  listDefendants,
  showDefendant,
  updateDefendant,
  deleteDefendant,
} = require("./defendant.service");

const createDefendantController = async (req, res) => {
  try {
    const { defendantName, defendantPhone, processes } = req.body;
    const newDefendant = {
      defendantName,
      defendantPhone,
      processes,
    };
    const defendant = await createDefendant(newDefendant);
    res.status(201).json({ message: "Defendant created", data: defendant });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Defendant could not created", data: error.message });
  }
};

const updateDefendantController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedDefendant = await updateDefendant(id, data);
    res
      .status(200)
      .json({ message: "Defendant updated", data: updatedDefendant });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Defendant could not be updated", data: error.message });
  }
};

const listDefendantsController = async (req, res) => {
  try {
    const defendants = await listDefendants();
    res.status(200).json({ message: "Defendants listed", data: defendants });
  } catch (error) {
    res
      .status(400)
      .json({ message: "defendants could not listed", data: error.message });
  }
};

const showDefendantController = async (req, res) => {
  try {
    const { id } = req.params;
    const defendant = await showDefendant(id);
    res.status(200).json({ message: "Defendant listed", data: defendant });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Defendant could not listed", data: error.message });
  }
};

const deleteDefendantController = async (req, res) => {
  try {
    const { id } = req.params;
    const Defendant = await deleteDefendant(id);

    res.status(200).json({ message: "Defendant deleted", data: Defendant });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Defendant could not deleted", data: error.message });
  }
};

module.exports = {
  createDefendantController,
  listDefendantsController,
  showDefendantController,
  updateDefendantController,
  deleteDefendantController,
};
