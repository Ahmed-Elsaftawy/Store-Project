import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { productModle } from "../models/product-model.js"
import { log } from "node:console";
import { appErrorHandler } from "../utils/appError.js";

const getAllProductsStatic = asyncWrapper(async (req, res) => {
    const products = await productModle.find({ price: { $gt: 30 } }).sort('name').limit().skip(1)
    res.status(200).json({ status: "success", data: products, nbHits: products.length });
})


//get product by the name 
const getProductByName = asyncWrapper(async (req, res, next) => {
    const { sort, fields, limit, skip, page, numercFilters, ...allowedQuery } = req.query
    let allowedQueryValues = Object.keys(allowedQuery)

    const queryObj = {}
    const sortValue = sort ? sort.split(",").join(" ") : "createdAt";
    const fieldsValue = fields ? fields.split(",").join(" ") : "";
    const limitValue = +limit || 10;
    const pageValue = +page || 1;
    const skipValue = (page - 1) * limit;
    if (numercFilters) {
        const operatroMap = {
            '>': "$gt",
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|<=)\b/g;
        let numbercFiltersValue = numercFilters.replace(regEx, (match) => `-${operatroMap[match]}-`);
        const options = ["price", 'rating'];
        numbercFiltersValue = numbercFiltersValue.split(",").forEach(item => {
            let [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObj[field] = { [operator]: +value };
            }
        });


    }
    for (const key in allowedQuery) {
        if ((allowedQueryValues.includes(allowedQuery[key]))) {

            return next(appErrorHandler("Not Found Product", 404, "Failed"))
        }

        if (key == "name" || key == "company") {
            queryObj[key] = { $regex: allowedQuery[key], $options: "i" };
        } else {
            queryObj[key] = allowedQuery[key];

        }
    }


    log(queryObj)
    const product = await productModle
        .find(queryObj)
        .sort(sortValue)
        .select(fieldsValue)
        .limit(limitValue)
        .skip(skipValue);

    //to prevent returning an emtpy value
    if (product.length == 0) {
        return next(appErrorHandler("Not Found Product", 404, "Failed"))
    }
    res.status(200).json({ status: "success", data: product, nbHits: product.length });
})


export { getAllProductsStatic, getProductByName }