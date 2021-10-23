const mongoose = require('mongoose');
require("dotenv").config()

const number = process.env.SLOT

const parkSchema = new mongoose.Schema({
    car: {type: String, required: true},
    slot : {type: String, required: true},
    slotID: {type: String, required: true, default: number}
}, {
    versionKey: false,
    timestamps: true
})

const Park = mongoose.model("park", parkSchema);

module.exports = Park;