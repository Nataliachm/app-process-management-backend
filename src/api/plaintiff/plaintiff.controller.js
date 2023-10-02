const {
  createPlaintiff,
  listPlaintiffs,
  showPlaintiff,
  updatePlaintiff,
  deletePlaintiff,
} = require("./plaintiff.service");

const createPlaintiffController = async (req, res) => {
  try {
    const { plaintiffName, plaintiffPhone, processes } = req.body;
    const newPlaintiff = {
      plaintiffName,
      plaintiffPhone,
      processes,
    };
    const plaintiff = await createPlaintiff(newPlaintiff);
    res.status(201).json({ message: "Plaintiff created", data: plaintiff });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Plaintiff could not created", data: error.message });
  }
};

const updatePlaintiffController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedPlaintiff = await updatePlaintiff(id, data);

    res
      .status(200)
      .json({ message: "Plaintiff updated", data: updatedPlaintiff });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Plaintiff could not be updated", data: error.message });
  }
};

const listPlaintiffsController = async (req, res) => {
  try {
    const plaintiffs = await listPlaintiffs();
    res.status(200).json({ message: "Plaintiffs listed", data: plaintiffs });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Plaintiffs could not listed", data: error.message });
  }
};

const showPlaintiffController = async (req, res) => {
  try {
    const { id } = req.params;
    const plaintiff = await showPlaintiff(id);
    res.status(200).json({ message: "Plaintiff listed", data: plaintiff });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Plaintiff could not listed", data: error.message });
  }
};

const deletePlaintiffController = async (req, res) => {
  try {
    const { id } = req.params;
    const Plaintiff = await deletePlaintiff(id);

    res.status(200).json({ message: "Plaintiff deleted", data: Plaintiff });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Plaintiff could not deleted", data: error.message });
  }
};

module.exports = {
  createPlaintiffController,
  listPlaintiffsController,
  showPlaintiffController,
  updatePlaintiffController,
  deletePlaintiffController,
};
