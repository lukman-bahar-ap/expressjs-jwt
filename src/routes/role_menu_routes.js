const express = require('express');
const roleMenuController = require('../controllers/role_menu_controller');

const router = express.Router();

router.get('/', roleMenuController.getAllRoleMenus);
router.get('/:id', roleMenuController.getRoleMenuById);
router.get('/:id/role', roleMenuController.getMenuByRoles);
router.post('/', roleMenuController.createRoleMenu);
router.put('/:id', roleMenuController.updateRoleMenu);
router.delete('/:id', roleMenuController.deleteRoleMenu);

module.exports = router;
