const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const config = process.env;

const storeUserToken = async (id, token) => {
  const updateFromModel = await User.update({ token }, { where: { id } });
  return updateFromModel[0] === 1;
};

const createJwtToken = async (user) => {
  try {
    const token = jwt.sign(
      {
        user_id: user.id,
        password: user.password,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '12h',
      },
    );
    const saveToken = storeUserToken(user.id, token);
    console.log(`x auth token stored = ${saveToken}`);
    return token;
  } catch (error) {
    return error;
  }
};

const comparePassword = async (inputPass, user) => {
  // Validate if user exist in our database
  // console.log(`${inputPass} => ${user.password} token => ${process.env.JWT_SECRET_KEY}`);
  if (await argon2.verify(user.password, inputPass)) {
    // Create token
    try {
      const token = await createJwtToken(user);
      return { success: true, token };
    } catch (error) {
      try {
        return error.errors[0].message;
      } catch {
        return error;
      }
    }
  }
  return false;
};

const checkLoginAuth = async (email, password) => {
  const findUser = await User.findOne({ where: { email } });

  if (findUser == null) {
    return { message: `Email ${email}, not registered` };
  }
  // user
  const createToken = await comparePassword(password, findUser);
  if (createToken.success) {
    return {
      status: 200,
      data: {
        email: findUser.email,
        token: findUser.token,
      },
    };
  }
  return { message: 'Invalid Credentials' };
};

const destroyToken = async (token, user) => {
  const { id, password } = user;
  try {
    const destroySession = () => jwt.sign(token, '', { expiresIn: 1 }, (logoutSuccess, err) => {
      if (logoutSuccess) {
        storeUserToken(id, '');
        return true;
      }
      return err;
    });

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if (password === decoded.password) {
      return destroySession();
    }
    return `Invalid Token, ${decoded}`;
  } catch (err) {
    return err;
  }
};

module.exports = {
  comparePassword, createJwtToken, destroyToken, checkLoginAuth,
};
