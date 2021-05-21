
const express      = require('express');

const router  = express.Router();

const shopController = require('../controllers/shop');

router.put('/product', shopController.putProduct);

router.post('/product/edit', shopController.postEdit);

router.delete('/product', shopController.deleteProduct);

router.get('/products', shopController.getProducts);



module.exports = router;