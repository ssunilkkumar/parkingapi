const mongoose = require('mongoose');
require("dotenv").config()

const number = process.env.SLOT || 5;

const parkSchema = new mongoose.Schema({
    car: {type: String, required: true},
    slot : {type: Number, required: true},
    slotID: {type: String, required: false, default: number}
}, {
    versionKey: false,
    timestamps: true
})

const Park = mongoose.model("park", parkSchema);

module.exports = Park;