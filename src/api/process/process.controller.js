const {
  createProcess,
  listProcesses,
  showProcess,
  updateProcess,
  deleteProcess,
} = require("./process.service");

const createProcessController = async (req, res) => {
  try {
    const { _id, processName, address, auctionDate, plaintiffs } = req.body;
    const newProcess = {
      _id,
      processName,
      address,
      auctionDate,
      plaintiffs,
    };
    const process = await createProcess(newProcess);
    res.status(201).json({ message: "Process created", data: process });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Process could not created", data: error.message });
  }
};

const updateProcessController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProcess = await updateProcess(id, data);
    res.status(200).json({ message: "Process updated", data: updatedProcess });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Process could not be updated", data: error.message });
  }
};

const listProcessesController = async (req, res) => {
  try {
    const processes = await listProcesses();
    res.status(200).json({ message: "Processes listed", data: processes });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Processes could not listed", data: error.message });
  }
};

const showProcessController = async (req, res) => {
  try {
    const { id } = req.params;
    const process = await showProcess(id);
    res.status(200).json({ message: "Process listed", data: process });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Process could not listed", data: error.message });
  }
};

const deleteProcessController = async (req, res) => {
  try {
    const { id } = req.params;
    const Process = await deleteProcess(id);

    res.status(200).json({ message: "Process deleted", data: Process });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Process could not deleted", data: error.message });
  }
};

module.exports = {
  createProcessController,
  listProcessesController,
  showProcessController,
  updateProcessController,
  deleteProcessController,
};
