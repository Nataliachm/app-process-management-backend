const { Schema, model } = require("mongoose");

const plaintiffSchema = new Schema(
  {
    plaintiffName: String,
    plaintiffPhone: Number,
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

const Plaintiff = model("Plaintiff", plaintiffSchema);

module.exports = Plaintiff;
