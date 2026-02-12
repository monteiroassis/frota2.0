const express = require('express');
const router = express.Router();
const Manifest = require('../models/Manifest');
const FreightMargin = require('../models/FreightMargin');
const Person = require('../models/Person');
const VehicleStatus = require('../models/VehicleStatus');

// Manifests
router.get('/manifests', async (req, res) => {
    try {
        const data = await Manifest.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/manifests', async (req, res) => {
    try {
        await Manifest.deleteMany({});
        const data = await Manifest.insertMany(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Freight Margins
router.get('/margins', async (req, res) => {
    try {
        const data = await FreightMargin.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/margins', async (req, res) => {
    try {
        await FreightMargin.deleteMany({});
        const data = await FreightMargin.insertMany(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// People
router.get('/people', async (req, res) => {
    try {
        const data = await Person.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/people', async (req, res) => {
    try {
        await Person.deleteMany({});
        const data = await Person.insertMany(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Vehicle Status
router.get('/vehicle-status', async (req, res) => {
    try {
        const data = await VehicleStatus.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/vehicle-status', async (req, res) => {
    try {
        await VehicleStatus.deleteMany({});
        const data = await VehicleStatus.insertMany(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
