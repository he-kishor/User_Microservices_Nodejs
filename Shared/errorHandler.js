
const errorHandler = (res, error) => {
    const status = error.status || 500;
    const message = error.message || "Server error";
    res.status(status).json({ message });
  };
  
  module.exports = errorHandler;
  