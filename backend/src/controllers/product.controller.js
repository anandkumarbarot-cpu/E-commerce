import APIFeatures from "../utils/apiFeatures.js";

export const getProducts = async (req, res, next) => {
    try {
        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();

        const apiFeature = new APIFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const products = await apiFeature.query;

        res.json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount: products.length,
        });

    } catch (err) {
        next(err);
    }
};

export const getProductsById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        next(err);
    }
};