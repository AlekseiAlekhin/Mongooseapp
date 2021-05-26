const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

router.get('/', product_controller.getUsersProducts);
router.post('/create', product_controller.product_create);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);
router.put('/updateAll', product_controller.productUpdateAll)
router.delete('/deleteAllChecked', product_controller.productDeleteAll);
router.get('/userId', product_controller.userId)

router.post('/createUser', product_controller.userCreate)
router.get('/getUser', product_controller.getUser)
router.get('/chekToken', product_controller.chekToken)

module.exports = router;