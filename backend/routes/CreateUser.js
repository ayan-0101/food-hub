const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JwtSecret = "AlmightyPushhhh...."

router.post('/createUser',
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }

            // Validation passed, proceed to create the user
            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });

            // Respond with success message
            return res.status(201).json({ success: true, message: `Hello, ${req.body.name}! User created successfully.` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });

router.post('/loginuser',
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        let email = req.body.email;
        try {
            let userData = await user.findOne({ email })
            if (!userData) {
                return res.status(400).json({ error: "Invalid Email" })
            }

            const comparePwd = await bcrypt.compare(req.body.password, userData.password)

            if (!comparePwd) {
                return res.status(400).json({ error: "Invalid Password" })
            }
            const data = {
                user:{
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,JwtSecret )
            return res.json({ success: true, authToken:authToken })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    })

module.exports = router;
