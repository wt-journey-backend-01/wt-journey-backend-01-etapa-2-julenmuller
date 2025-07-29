const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

router.get('/', agentesController.getAllAgentes);
router.post('/', agentesController.createAgente);
router.put('/:id', agentesController.updateAgente);
router.patch('/:id', agentesController.patchAgente);
router.delete('/:id', agentesController.deleteAgente);

app.use(errorHandler);

module.exports = router;