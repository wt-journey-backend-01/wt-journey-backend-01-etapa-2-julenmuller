const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

router.get('/', casosController.getAllCasos);
router.post('/', casosController.createCaso);
router.get('/:caso_id/agente', casosController.getAgenteResponsavel);
router.get('/:id', casosController.getCasoById);
router.put('/:id', casosController.updateCaso);
router.patch('/:id', casosController.patchCaso);
router.delete('/:id', casosController.deleteCaso);

app.use(errorHandler);

module.exports = router;