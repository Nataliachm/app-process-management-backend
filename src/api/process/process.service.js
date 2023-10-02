const Process = require("./process.model");
const Plaintiff = require("../plaintiff/plaintiff.model");
const { updateManyToManyRelations } = require("../../utils.js");

const createProcess = async (data) => {
  try {
    const newProcessInstance = await Process.create(data);
    await Plaintiff.updateMany(
      { _id: newProcessInstance.plaintiffs },
      { $push: { processes: newProcessInstance._id } }
    );
    return newProcessInstance;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProcess = async (id, data) => {
  try {
    const newPlaintiffs = data.plaintiffs || [];
    const oldProcess = await Process.findById(id);
    const oldPlaintiffs = oldProcess.plaintiffs;

    await updateManyToManyRelations(
      Plaintiff,
      id,
      newPlaintiffs,
      oldPlaintiffs,
      "processes"
    );

    const updatedProcess = await Process.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProcess;
  } catch (error) {
    throw new Error(error);
  }
};

const listProcesses = async () => {
  try {
    const processes = await Process.find().select(
      "_id processName address auctionDate plaintiffs"
    );
    // .populate({
    //   path: "user",
    //   select: "name email -_id",
    // })
    return processes;
  } catch (error) {
    throw new Error(error);
  }
};

const showProcess = async (id) => {
  try {
    const process = await Process.findById(id);
    return process;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProcess = async (id) => {
  try {
    const deletedProcess = await Process.findByIdAndDelete(id);
    await Plaintiff.updateMany(
      { _id: newProcessInstance.plaintiffs },
      { $push: { processes: newProcessInstance._id } }
    );
    return deletedProcess;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createProcess,
  listProcesses,
  showProcess,
  updateProcess,
  deleteProcess,
};
