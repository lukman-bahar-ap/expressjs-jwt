const express = require('express');
const menuController = require('../controllers/menu_controller');
const menuPermissionController = require('../controllers/menu_permission_controller');

const router = express.Router();

router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.post('/', menuController.createMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

router.get('/:menuId/permission/', menuPermissionController.getAllMenuPermissions);
router.get('/:menuId/permission/:id', menuPermissionController.getMenuPermission);
router.post('/:menuId/permission/', menuPermissionController.createMenuPermission);
router.put('/:menuId/permission/:id', menuPermissionController.updateMenuPermission);
router.delete('/:menuId/permission/:id', menuPermissionController.deleteMenuPermission);

module.exports = router;
