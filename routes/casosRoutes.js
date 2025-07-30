const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/', casosController.getAllCasosComFiltro);

router.post('/', casosController.createCaso);
router.get('/:caso_id/agente', casosController.getAgenteResponsavel);
router.get('/:id', casosController.getCasoById);
router.put('/:id', casosController.updateCaso);
router.patch('/:id', casosController.patchCaso);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;