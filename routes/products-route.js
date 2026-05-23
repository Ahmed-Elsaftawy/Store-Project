import express from "express";
import { getAllProductsStatic } from "../controllers/products.js";


const router = express.Router();

router.route('/').get(getAllProductsStatic);



export { router }