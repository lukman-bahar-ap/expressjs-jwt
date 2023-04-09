require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// impor routes
const authRoutes = require('./src/routes/auth_routes');
const userRoutes = require('./src/routes/user_routes');
const menuRoutes = require('./src/routes/menu_routes');
const menuPermissionRoutes = require('./src/routes/menu_permission_routes');
const roleRoutes = require('./src/routes/role_routes');
const roleMenuRoutes = require('./src/routes/role_menu_routes');
const roleMenuPermissionRoutes = require('./src/routes/role_menu_permission_routes');

const middleware = require('./src/middleware/logs');
const auth = require('./src/middleware/is_authenticated');

const app = express();

app.use(cors());
// Add middleware to handle incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.logRequest);

// Add routes
app.use('/auth', authRoutes);
app.use('/users', auth, userRoutes);
app.use('/menus', auth, menuRoutes);
app.use('/menu-permissions', auth, menuPermissionRoutes);
app.use('/roles', auth, roleRoutes);
app.use('/role-menus', auth, roleMenuRoutes);
app.use('/role-menu-permissons', auth, roleMenuPermissionRoutes);

app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
