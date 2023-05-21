const express = require('express');
const roleMenuPermissionController = require('../controllers/role_menu_permission_controller');

const router = express.Router();

router.get('/', roleMenuPermissionController.getAllRoleMenuPermissions);
router.get('/:id', roleMenuPermissionController.getRoleMenuPermissionById);
router.post('/', roleMenuPermissionController.createRoleMenuPermission);
router.put('/:id', roleMenuPermissionController.updateRoleMenuPermission);
router.delete('/:id', roleMenuPermissionController.deleteRoleMenuPermission);

module.exports = router;
