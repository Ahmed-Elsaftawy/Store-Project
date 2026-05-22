import { config } from "dotenv";
import { connectDb } from "./index.js";
import data from "./products.json" assert  {type: "json"};
import { productModle } from "./models/product-model.js";
config();