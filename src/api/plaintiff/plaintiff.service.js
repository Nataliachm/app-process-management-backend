const Plaintiff = require("./plaintiff.model");
const Process = require("../process/process.model");
const { updateManyToManyRelations } = require("../../utils.js");

const createPlaintiff = async (data) => {
  try {
    const newPlaintiffInstance = await Plaintiff.create(data);
    await Process.updateMany(
      { _id: newPlaintiffInstance.processes },
      { $push: { plaintiffs: newPlaintiffInstance._id } }
    );
    return newPlaintiffInstance;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePlaintiff = async (id, data) => {
  try {
    const newProcesses = data.processes || [];
    const oldPlaintiff = await Plaintiff.findById(id);
    const oldProcesses = oldPlaintiff.processes;

    await updateManyToManyRelations(
      Process,
      id,
      newProcesses,
      oldProcesses,
      "plaintiffs"
    );

    const updatedPlaintiff = await Plaintiff.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedPlaintiff;
  } catch (error) {
    throw new Error(error);
  }
};

const listPlaintiffs = async () => {
  try {
    const plaintiffs = await Plaintiff.find().select("plaintiffName processes");
    return plaintiffs;
  } catch (error) {
    throw new Error(error);
  }
};

const showPlaintiff = async (id) => {
  try {
    const plaintiff = await Plaintiff.findById(id);
    return plaintiff;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePlaintiff = async (id) => {
  try {
    const plaintiff = await Plaintiff.findById(id);
    await Process.updateMany(
      { _id: plaintiff.processes },
      { $pull: { plaintiffs: plaintiff._id } }
    );
    const deletedPlaintiff = await Plaintiff.findByIdAndDelete(id);
    return deletedPlaintiff;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPlaintiff,
  listPlaintiffs,
  showPlaintiff,
  updatePlaintiff,
  deletePlaintiff,
};
