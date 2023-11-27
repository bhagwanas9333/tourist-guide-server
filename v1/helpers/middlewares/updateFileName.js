const updateFileName = (field, path) => {
  return (req, res, next) => {
    if (req?.file) {
      req.body[field] = `${path}/${req?.file.fileName}`;
    }
    next();
  };
};

module.exports = updateFileName;
