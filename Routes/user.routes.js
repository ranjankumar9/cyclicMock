const express = require("express")
const { userModel } = require("../Model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router()


userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new userModel({ name, email, password: hash })
            await user.save()
            res.send({ "msg": "user has been registered" })
        });

    }
    catch (err) {
        res.send({ "msg": "user registered failed" })
        console.log(err)
    }
})

userRouter.post("/login", async(req,res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, "masai");
                    res.send({ msg: "Login Successful", "token": token })
                } else {
                    res.send({ msg: 'Wrong Credntials' })
                }
            });
        }else{
            res.send({msg:"Wrong Credntials"})
        }

    } catch (err) {
        res.send({msg:"Something went Wrong", "error":err.message})
    }
})




module.exports = {
    userRouter
}

