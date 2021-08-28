const HttpCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  }
  
  const Packages = {
    STARTER: "starter",
    PRO: "pro",
    BUSINESS: "business"

  }
  module.exports = { HttpCode, Packages }