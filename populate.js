import { config } from "dotenv";
import { connectDb } from "./utils/db.js";
import fs from "fs/promises";
import { productModle } from "./models/product-model.js";
import { log } from "console";

config();
await connectDb(process.env.DB_URI);

const rawData = await fs.readFile('./products.json', "utf-8");
const data = JSON.parse(rawData);

console.log(data);
await productModle.deleteMany();
await productModle.create(data);

console.log("Done ✅");
process.exit(0);
