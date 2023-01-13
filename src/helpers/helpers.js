const sendResponse = (req, res, data, status = 200) => {
  res
    .status(status)
    .send({
      data,
      refreshToken: req.refreshToken ? req.refreshToken : undefined,
    });
};
module.exports = { sendResponse };
