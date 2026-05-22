import { asyncWrapper } from "../utils/asyncWrapper.js";


const getAllProducts = asyncWrapper(async (req, res) => {
    throw new Error("This is an Error")
    res.status(200).json({ message: "success" });
})

export { getAllProducts }