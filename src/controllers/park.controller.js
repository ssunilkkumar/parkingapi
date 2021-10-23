const express = require ("express");
const router = express.Router();

const Park = require ("../models/Park.model")

router.get("/", async (req, res) => {
    const parks = await Park.find().populate("user").lean().exec();

    return res.status(200).json({data: parks})
})

router.post("/", async (req, res) => {
    const park = await Park.create(req.body);

    return res.status(201).json({data: park})
})


router.delete("/:id", async (req, res) => {
    try {
        const park = await Park.findByIdAndDelete(req.params.id)
        res.status(400).json({park})
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

module.exports = router