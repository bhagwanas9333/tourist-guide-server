const updateFileName = (field, path) => {
  return (req, res, next) => {
    if (req?.file) {
      req.body[field] = `${path}/${req?.file.filename}`;
    }
    next();
  };
};

module.exports = updateFileName;
