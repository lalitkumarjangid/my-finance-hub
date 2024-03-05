const express = require('express');
const bodyParser = require('body-parser');
const userRouter = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

userRouter.use(bodyParser.json());

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

userRouter.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            console.log(signupBody.safeParse(req.body));
            console.log(req.body);
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token,
            message: "Successfully logged in"
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

const { authMiddleware } = require("../middleware");

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
        return;
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({
            message: "Updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
});

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        });

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
});

userRouter.get('/data', async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            error: 'Server error'
        });
    }
});

async function findByIdAndUpdate(id, otherId, amount, res) {
    try {
        const user = await User.findById(id);

        if (!user || user.balance < amount) {
            res.status(400).json("Insufficient balance or user not found");
            return;
        }

        await User.updateOne({ _id: id }, { $inc: { balance: -amount } });
        await User.updateOne({ _id: otherId }, { $inc: { balance: amount } });

        res.json("Transaction successful");
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
    }
}

const transferFunds = async (fromAccountId, toAccountId, amount, res) => {
    await findByIdAndUpdate(fromAccountId, toAccountId, amount, res);
    // await findByIdAndUpdate(toAccountId, fromAccountId, amount, res);
};

userRouter.get('/me', authMiddleware, async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({
            msg: "Not Logged In"
        });
    }

    try {
        const userDetails = await User.findById(userId);
        const accountDetails = await Account.findOne({
            userId: userId,
        });

        res.json({
            user: {
                firstName: userDetails ? userDetails.firstName : "",
                lastName: userDetails ? userDetails.lastName : "",
                username: userDetails ? userDetails.username : "",
            },
            account: {
                balance: accountDetails ? accountDetails.balance : 0,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
});

module.exports = userRouter;