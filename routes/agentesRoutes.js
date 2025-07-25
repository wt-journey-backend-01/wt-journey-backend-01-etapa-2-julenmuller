const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/', agentesController.getAllAgentes);
router.post('/', agentesController.createAgente);
router.put('/:id', agentesController.updateAgente);
router.patch('/:id', agentesController.patchAgente);
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;