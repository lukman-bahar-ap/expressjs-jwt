require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth_routes');
const userRoutes = require('./src/routes/user_routes');
const middleware = require('./src/middleware/logs');
const auth = require('./src/middleware/is_authenticated');

const app = express();
const HOST = '0.0.0.0';

app.use(cors());
// Add middleware to handle incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.logRequest);

// Add routes
app.use('/auth', authRoutes);
app.use('/users', auth, userRoutes);
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
