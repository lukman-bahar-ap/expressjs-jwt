const express = require('express');
const roleController = require('../controllers/role_controller');

const router = express.Router();

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.get('/:id/show/', roleController.getGrantRoleById);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
