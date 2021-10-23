const express = require ("express");
const router = express.Router();
require("dotenv").config()

const num = process.env.SLOT

const Slot = require ("../models/Slot.model")

router.get("/", async (req, res) => {
    const slots = await Slot.find().populate("user").lean().exec();

    return res.status(200).json({data: slots})
})

router.post("/", async (req, res) => {
    try{
        const slot = await Slot.create({capacity: num});
        //console.log(slot)
        return res.status(201).json({data: slot})
    } catch (err) {
        res.status(400).json({message: "slot already exit"})
    }
    
})


router.delete("/:id", async (req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id)
        res.status(400).json({slot})
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

module.exports = router