const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: String,
    status: {
        type: Boolean,
        default: false, // You can set a default value if needed
    },
});

module.exports = mongoose.model("Todo", todoSchema);
