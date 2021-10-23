const mongoose = require('mongoose');
require("dotenv").config()

const number = process.env.sample.SLOT

const slotSchema = new mongoose.Schema({
    capacity: {type: Number, required: true, default: number, unique: true},
    parked: {type: Number, required: true, default: 0},
    free: {type: Number, required: true, default: number},
    park:  {type: [{type: Number, required: false}]}
}, {
    versionKey: false,
    timestamps: true
})


const Slot = mongoose.model("slot", slotSchema);

module.exports = Slot;