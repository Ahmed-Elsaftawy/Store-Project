import mongoose from "mongoose";

async function connectDb(url) {
    await mongoose.connect(url).then(() => {
        console.log("DataBase is connected");
    })

}

export { connectDb };