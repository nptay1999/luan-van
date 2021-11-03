const jwt = require("jsonwebtoken")

module.exports = (authHeader) => {
  if (!authHeader) {
    return {
      isAuth: false,
      user: null,
    }
  }
  const token = authHeader.split(" ")[1]
  if (!token || token === "") {
    return {
      isAuth: false,
      user: null,
    }
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY)
    if (!decodedToken) {
      return {
        isAuth: false,
        userId: null,
      }
    }
    return {
      isAuth: true,
      user: decodedToken,
    }
  } catch (error) {
    return {
      isAuth: false,
      user: null,
    }
  }
}
