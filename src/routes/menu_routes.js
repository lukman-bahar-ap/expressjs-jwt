const express = require('express');
const menuController = require('../controllers/menu_controller');
const menuPermissionController = require('../controllers/menu_permission_controller');

const router = express.Router();

router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.post('/', menuController.createMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

router.get('permission/', menuPermissionController.getAllMenuPermissions);
router.get('permission/:id', menuPermissionController.getMenuPermissionById);
router.post('permission/', menuPermissionController.createMenuPermission);
router.put('permission/:id', menuPermissionController.updateMenuPermission);
router.delete('permission/:id', menuPermissionController.deleteMenuPermission);

module.exports = router;
