const { Schema, model } = require("mongoose");

const processSchema = new Schema(
  {
    _id: String, //es el radicado.
    processName: String,
    address: String,
    auctionDate: String,
    rapporteur: String,
    address: String,
    outstanding: Boolean,
    propertyClass: String,
    emails: [String],
    plaintiffs: {
      type: [{ type: Schema.Types.ObjectId, ref: "Plaintiff" }],
      required: false,
    },
    defendants: {
      type: [{ type: Schema.Types.ObjectId, ref: "Defendant" }],
      required: false,
    },
    curt: {
      type: Schema.Types.ObjectId,
      ref: "Curt",
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Process = model("Process", processSchema);

module.exports = Process;
