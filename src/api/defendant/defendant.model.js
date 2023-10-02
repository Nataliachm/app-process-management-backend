const { Schema, model } = require("mongoose");

const defendantSchema = new Schema(
  {
    defendantName: String,
    defendantPhone: Number,
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

const Defendant = model("Defendant", defendantSchema);

module.exports = Defendant;
