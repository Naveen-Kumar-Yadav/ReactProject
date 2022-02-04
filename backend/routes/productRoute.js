const express= require("express");
const { getAllProducts,createProduct, updateProducts, deleteProducts, getproductDetails } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts).delete(deleteProducts).get(getproductDetails)



module.exports = router