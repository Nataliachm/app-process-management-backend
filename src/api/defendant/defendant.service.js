const Defendant = require("./defendant.model");
const Process = require("../process/process.model");
const { updateManyToManyRelations } = require("../../utils.js");

const createDefendant = async (data) => {
  try {
    const newDefendantInstance = await Defendant.create(data);
    await Process.updateMany(
      { _id: newDefendantInstance.processes },
      { $push: { defendants: newDefendantInstance._id } }
    );
    return newDefendantInstance;
  } catch (error) {
    throw new Error(error);
  }
};

const updateDefendant = async (id, data) => {
  try {
    const newProcesses = data.processes || [];
    const oldDefendant = await Defendant.findById(id);
    const oldProcesses = oldDefendant.processes;

    await updateManyToManyRelations(
      Process,
      id,
      newProcesses,
      oldProcesses,
      "defendants"
    );
    const updatedDefendant = await Defendant.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDefendant;
  } catch (error) {
    throw new Error(error);
  }
};

const listDefendants = async () => {
  try {
    const defendants = await Defendant.find().select(
      "defendantName defendantPhone processes"
    );
    return defendants;
  } catch (error) {
    throw new Error(error);
  }
};

const showDefendant = async (id) => {
  try {
    const defendant = await Defendant.findById(id);
    return defendant;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteDefendant = async (id) => {
  try {
    const defendant = await Defendant.findById(id);
    await Process.updateMany(
      { _id: defendant.processes },
      { $pull: { defendants: defendant._id } }
    );
    const deletedDefendant = await Defendant.findByIdAndDelete(id);
    return deletedDefendant;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createDefendant,
  listDefendants,
  showDefendant,
  updateDefendant,
  deleteDefendant,
};
