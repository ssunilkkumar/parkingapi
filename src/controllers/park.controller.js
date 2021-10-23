const express = require ("express");
const router = express.Router();
require("dotenv").config()

const num = process.env.SLOT || 5;

const Park = require ("../models/Park.model")
const Slot = require ("../models/Slot.model")

router.get("/", async (req, res) => {
    const car = req.body.car
    const slot = req.body.slot
    //console.log(car, slot)
    if (car) {
        const parks = await Park.findOne({$and: [{"slotID": num}, {"car": car}]}).lean().exec();
        return res.status(200).json({data: parks})
    }
    else if(slot) {
        const parks = await Park.findOne({$and: [{"slotID": num}, {"slot": slot}]}).lean().exec();
        return res.status(200).json({data: parks})
    }

   
})

router.post("/", async (req, res) => {
        const match = await Slot.findOne({capacity: num}).lean().exec();
        //console.log(match)
        if(match.parked < num) {
            let parkedcar = match.park.sort((a,b) => a-b)
            let freeslot = getslot(parkedcar)

            function getslot(a) {
                let n = a.length;
                let i, total=1;
                for(i=0; i<=n; i++) {
                  if(parkedcar[i] === i+1) {
                    total = parkedcar[i]
                  }
                  else {
                    total=i+1
                    break;
                  }
                }
                console.log(parkedcar, total);
                parkedcar.push(total)
                return total;
              }
            const park = await Park.create({car: req.body.car, slot: freeslot, slotID: num});
            const slotupdate = await Slot.findByIdAndUpdate(match._id,  
                {park: parkedcar, parked: match.parked+1, free: match.capacity-match.parked })
            return res.status(201).json({data: park})
        }
        else {
            return res.status(201).json({data: "parking full"})
        }
        

       
})


router.delete("/", async (req, res) => {
    try {
        const match = await Slot.findOne({capacity: num}).lean().exec();
        let updated = match.park
        //console.log(updated)
        for(let i=0; i<updated.length; i++) {
            if(updated[i] === req.body.slot) {
                let removed = updated.splice(i, 1);
                break;
            }
        }
        console.log(updated);
        const slotupdate = await Slot.findByIdAndUpdate(match._id,  
            {park: updated, parked: match.parked-1, free: match.capacity-updated.length })
        const findslot = await Park.findOneAndDelete({$and: [{"slotID": num}, {"slot": req.body.slot}]})
        
        return res.status(400).json({findslot})
    } catch (err) {
        res.status(400).json({message: err.message})

    }
})

module.exports = router