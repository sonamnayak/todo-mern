const error = ({ status, message }, req, res, next) => {
  if (!(status && message)) return next();
  const obj = new Error();
  obj.status = status;
  obj.message = message;
  return obj;
};

module.exports = error;
