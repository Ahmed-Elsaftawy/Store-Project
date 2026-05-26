import express from "express";
import { getAllProductsStatic, getProductByName } from "../controllers/products.js";


const router = express.Router();

router.route('/')
    .get(getProductByName);
router.route('/static').get(getAllProductsStatic)



export { router }