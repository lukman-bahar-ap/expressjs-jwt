const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      bcrypt.compare(password, user.password)
        .then((result) => {
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect email or password.' });
        });

      return done(null, false, { message: 'something else' });
    })
    .catch((err) => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

const createJwtToken = async (user) => {
  try {
    const token = jwt.sign(
      { user_id: user.id, password: user.password },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '2h',
      },
    );
    return token;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const comparePassword = async (inputPass, user) => {
  // Validate if user exist in our database
  console.log(`${inputPass} => ${user.password} token => ${process.env.JWT_SECRET_KEY}`);
  if (await bcrypt.compare(inputPass, user.password)) {
    // Create token
    try {
      const token = await createJwtToken(user);
      return token;
    } catch (error) {
      console.error(error);
      try {
        return error.errors[0].message;
      } catch {
        return error;
      }
    }
  }
  return false;
};

const registerUser = async (userData) => {
  const { username, email, password } = userData;
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({ username, email, password: hash }));
};

const destroyToken = async (token) => {
  try {
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // perform any additional checks on the decoded token if needed

    // if token is valid, add it to a blacklist (for example, in Redis)
    // or simply invalidate the token on the client-side
    // depending on your specific use case

    // respond with a success message

    return jwt.sign(token, '', { expiresIn: 1 }, (logout, err) => {
      blacklist.add(token);
      if (logout) {
        return true;
      }
      console.log(err);
      return false;
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  registerUser, comparePassword, createJwtToken, destroyToken,
};
