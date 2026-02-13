import express from 'express';
const router = express.Router();

// Manifests
router.get('/manifests', async (req, res) => {
    try {
        const data = await req.prisma.manifest.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/manifests', async (req, res) => {
    try {
        const result = await req.prisma.$transaction([
            req.prisma.manifest.deleteMany({}),
            req.prisma.manifest.createMany({ data: req.body })
        ]);
        res.json(result[1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Freight Margins
router.get('/margins', async (req, res) => {
    try {
        const data = await req.prisma.freightMargin.findMany();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/margins', async (req, res) => {
    try {
        const result = await req.prisma.$transaction([
            req.prisma.freightMargin.deleteMany({}),
            req.prisma.freightMargin.createMany({ data: req.body })
        ]);
        res.json(result[1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// People
router.get('/people', async (req, res) => {
    try {
        const data = await req.prisma.person.findMany();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/people', async (req, res) => {
    try {
        const result = await req.prisma.$transaction([
            req.prisma.person.deleteMany({}),
            req.prisma.person.createMany({ data: req.body })
        ]);
        res.json(result[1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Vehicle Status
router.get('/vehicle-status', async (req, res) => {
    try {
        const data = await req.prisma.vehicleStatus.findMany();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/vehicle-status', async (req, res) => {
    try {
        const result = await req.prisma.$transaction([
            req.prisma.vehicleStatus.deleteMany({}),
            req.prisma.vehicleStatus.createMany({ data: req.body })
        ]);
        res.json(result[1]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
