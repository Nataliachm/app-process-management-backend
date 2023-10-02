const Court = require("./court.model");
const Process = require("../process/process.model");

const createCourt = async (data) => {
  try {
    const newCourtInstance = await Court.create(data);
    await Process.updateMany(
      { _id: newCourtInstance.processes },
      { $push: { curt: newCourtInstance._id } }
    );
    return newCourtInstance;
  } catch (error) {
    throw new Error(error);
  }
};

const listCourts = async () => {
  try {
    const courts = await Court.find().select("courtName courtEmail processes");
    return courts;
  } catch (error) {
    throw new Error(error);
  }
};

const showCourt = async (id) => {
  try {
    const court = await Court.findById(id);
    return court;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCourt = async (id) => {
  try {
    const court = await Court.findById(id);

    await Process.updateMany(
      { _id: { $in: court.processes } },
      { $unset: { curt: "" } }
    );
    const deletedCourt = await Court.findByIdAndDelete(id);
    return deletedCourt;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCourt,
  listCourts,
  showCourt,
  deleteCourt,
};
