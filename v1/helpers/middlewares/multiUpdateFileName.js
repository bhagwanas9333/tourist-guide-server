const multiUpdateFileName = (field, path) => {
    return (req, res, next) => {
        if (req?.files) {
            console.log("req?.files:", req?.files);

            // Map through the array of files and update their paths
            req.body[field] = req.files.map(file => `${path}/${file.filename}`);
        }
        next();
    };
};

module.exports = multiUpdateFileName;