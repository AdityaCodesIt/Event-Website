const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        await prisma.contact.create({
            data: {
                name,
                email,
                message
            }
        });

        res.status(201).json({
            message: "Message Sent Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;