const Court = require("./court.model");

const {
  createCourt,
  listCourts,
  showCourt,

  deleteCourt,
} = require("./court.service");

const createCourtController = async (req, res) => {
  try {
    const { courtName, courtEmail, processes } = req.body;
    const newCourt = {
      courtName,
      courtEmail,
      processes,
    };
    const court = await createCourt(newCourt);
    res.status(201).json({ message: "Court created", data: court });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Court could not created", data: error.message });
  }
};

const listCourtsController = async (req, res) => {
  try {
    const courts = await listCourts();
    res.status(200).json({ message: "Courts listed", data: courts });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Courts could not listed", data: error.message });
  }
};

const showCourtController = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await showCourt(id);
    res.status(200).json({ message: "Court listed", data: court });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Court could not listed", data: error.message });
  }
};

const deleteCourtController = async (req, res) => {
  try {
    const { id } = req.params;
    const court = await deleteCourt(id);

    res.status(200).json({ message: "Court deleted", data: court });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Court could not deleted", data: error.message });
  }
};

module.exports = {
  createCourtController,
  listCourtsController,
  showCourtController,

  deleteCourtController,
};
