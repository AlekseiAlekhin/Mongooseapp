const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerToDo');
const controllerUser = require('../controllers/controllerUser')
const {tokenAccessForQuery} = require('../controllers/tokenAccess')


router.get('/', tokenAccessForQuery, controller.getToDos);
router.post('/create', tokenAccessForQuery,controller.createToDo);
router.put('/:id/update', tokenAccessForQuery, controller.updateToDo);
router.delete('/:id/delete', tokenAccessForQuery, controller.deleteToDo);
router.put('/updateAll', tokenAccessForQuery, controller.UpdateAllToDo)
router.delete('/deleteAllChecked',tokenAccessForQuery, controller.DeleteAllChecked);

router.get('/userId', controllerUser.userId)
router.post('/createUser', controllerUser.userCreate)
router.get('/getUser', controllerUser.getUser)
router.get('/chekToken', controllerUser.chekToken)

module.exports = router;