import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { productModle } from "../models/product-model.js"
import { log } from "node:console";
import { appErrorHandler } from "../utils/appError.js";

const getAllProductsStatic = asyncWrapper(async (req, res) => {
    const products = await productModle.find({}, { __v: false });
    res.status(200).json({ status: "success", data: products, nbHits: products.length });
})


//get product by the name 
const getProductByName = asyncWrapper(async (req, res, next) => {

    const allowedQuery = Object.keys(productModle.schema.paths)
    const queryObj = {}
    for (const key in req.query) {
        // log(key);
        if (allowedQuery.includes(key)) {

            queryObj[key] = req.query[key];
        } else {
            return next(appErrorHandler("Not Found Product", 404, "Failed"))
        }
    }

    const product = await productModle.find(queryObj)
    if (product.length == 0) {
        return next(appErrorHandler("Not Found Product", 404, "Failed"))
    }
    res.status(200).json({ status: "success", data: product, nbHits: product.length });
})


export { getAllProductsStatic, getProductByName }