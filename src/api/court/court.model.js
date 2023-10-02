const { Schema, model } = require("mongoose");

const courtSchema = new Schema(
  {
    courtName: String,
    courtEmail: String,
    processes: {
      type: [{ type: Schema.Types.String, ref: "Process" }],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Court = model("Court", courtSchema);

module.exports = Court;
