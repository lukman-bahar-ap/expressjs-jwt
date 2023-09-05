const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
  if (await argon2.verify(user.password, inputPass)) {
    // Create token
    try {
      const token = await createJwtToken(user);
      return { success: true, token };
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

const checkAuth = async (email, password) => {
  const checkedUser = await User.findOne({ where: { email } });

  if (checkedUser == null) {
    console.log({ status: 400, message: `Email ${email} unkown, not registered before` });
    return { status: 400, message: `Email ${email} unkown, not registered before` };
  }
  // user
  const createToken = await comparePassword(password, checkedUser);
  console.log(createToken);
  if (createToken.success) {
    console.log({ status: 200, email: checkedUser.email, token: createToken.token });
    return { status: 200, email: checkedUser.email, token: createToken.token };
  }
  return { status: 400, message: 'Invalid Credentials' };
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
  comparePassword, createJwtToken, destroyToken, checkAuth,
};
