import express from "express";
import { getAllProductsStatic, getProductByName } from "../controllers/products.js";


const router = express.Router();

router.route('/')
    .get(getProductByName, getAllProductsStatic);



export { router }