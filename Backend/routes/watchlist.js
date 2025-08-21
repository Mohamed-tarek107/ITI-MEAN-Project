const express = require("express");
const router = express.Router();
const Watchlist = require("../models/watchlist");

router.post('/', async (req,res) => {
    try {
        const newitem = new Watchlist(req.body)
        await newitem.save()
        res.json(newitem)
    } catch (error) {
        res.status(404).json({ error: error})
    }
});

router.get("/", async (req,res) => {
    try {
        const items = await Watchlist.find();
        res.json(items)
    } catch (error) {
        res.status(404).json({error: error})
    }
});

router.delete("/:id", async (req,res) => {
    try {
        await Watchlist.findByIdAndDelete(req.params.id)
        res.json({message: "deleted successfully"})
    } catch (error) {
        res.status(404).json({ error:"not found"})
    }
})

module.exports = router;