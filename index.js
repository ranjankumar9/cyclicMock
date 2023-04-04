const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.routes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    res.send("welcome")
})

app.use("/users", userRouter)


app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("Connected to the database")
    } catch (error) {
        console.log('server went wrong')
    }
    console.log(`Server is running at port ${process.env.port}`)
})