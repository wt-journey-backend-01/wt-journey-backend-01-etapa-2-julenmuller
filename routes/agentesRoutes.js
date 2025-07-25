const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/', agentesController.getAllAgentes);
router.post('/', agentesController.createAgente);

module.exports = router;