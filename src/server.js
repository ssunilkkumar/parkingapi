const express = require("express");
require("dotenv").config()

const connect = require("./config/db");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const parkController = require("./controllers/park.controller")
const slotController = require("./controllers/slot.controller")



app.get("/", async (req, res) => {
    res.send('Welcome to backend!');
})

app.use("/slots", slotController)
app.use("/parks", parkController)

const start = async () => {
    await connect();

    app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
    })
}


module.exports = start;