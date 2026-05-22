import { config } from "dotenv";
import express from "express";
import { log } from "node:console";
import mongoose from "mongoose";
import { router } from "./routes/products-route.js";
config();

const app = express();
app.use(express.json());
app.use('/api/products', router)
app.use((req, res) => res.status(404).json({ status: "Failed", message: "Not Found" }))


//error middelware handler 
app.use((error, req, res, next) => {
    if (error) {
        res.status(error.status || 500).json({ status: "Error", message: error.message })
    }
})


const port = process.env.PORT;
async function connectDb() {
    await mongoose.connect(process.env.DB_URI).then(() => {
        console.log("DataBase is connected");
    })

}
//connect to DB
function start() {
    connectDb()
    app.listen(port, () => {
        log(`listen from ${port}...`);

    });
}

start();

export { connectDb };