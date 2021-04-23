const User = require('../users/users-model');

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;

  try {
    const [ user ] = await User.findBy({ username });
    if(user){
      req.user = user;
      next();
    } else {
      next({ status: 400, message: "invalid credentials" });
    }
  } catch(err) {
    next(err);
  }
}

const checkUsernameFree = async (req, res, next) => {
  const { username } = req.body;
  try {
    const [ user ] = await User.findBy({ username });
    if(!user){
      next();
    } else {
      next({ status: 400, message: 'username taken' });
    }
  } catch(err){
    next(err);
  }
}

const checkUserBody = (req, res, next) => {
  const { username, password } = req.body;
  if(
    username && typeof username === 'string' && username !== '' &&
    password && typeof password === 'string' && password !== ''
  ){
    next();
  } else {
    next({ status: 400, message: 'username and password required' });
  }
}

module.exports = {
  checkUsernameExists,
  checkUsernameFree,
  checkUserBody,
}