import { asyncWrapper } from "../utils/asyncWrapper.js";
import { productModle } from "../models/product-model.js"

const getAllProductsStatic = asyncWrapper(async (req, res) => {
    const products = await productModle.find({}, { __v: false });
    res.status(200).json({ status: "success", data: products });
})

export { getAllProductsStatic }