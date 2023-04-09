const express = require('express');
const menuPermissionController = require('../controllers/menu_permission_controller');

const router = express.Router();

router.get('/', menuPermissionController.getAllMenuPermissions);
router.get('/:id', menuPermissionController.getMenuPermissionById);
router.post('/', menuPermissionController.createMenuPermission);
router.put('/:id', menuPermissionController.updateMenuPermission);
router.delete('/:id', menuPermissionController.deleteMenuPermission);

module.exports = router;
