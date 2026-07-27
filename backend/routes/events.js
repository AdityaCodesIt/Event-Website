const express = require("express");
const prisma = require("../config/prisma");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            date,
            time,
            location,
            maxAttendees,
            organizer
        } = req.body;

        const event = await prisma.event.create({
            data: {
                title,
                description,
                category,
                date,
                time,
                location,
                maxAttendees: parseInt(maxAttendees),
                organizer,
                userId: req.user.id
            }
        });

        res.status(201).json({
            message: "Event Created Successfully",
            event
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const events = await prisma.event.findMany({

            include: {
                user: true
            },

            orderBy: {
                createdAt: "desc"
            }

        });

        res.json(events);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.delete("/:id", auth, async (req, res) => {

    try {

        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (event.userId !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own events"
            });
        }

        await prisma.event.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });

        res.json({
            message: "Event Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;