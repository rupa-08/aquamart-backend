const StatusSchema = {
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
};

module.exports = StatusSchema;
