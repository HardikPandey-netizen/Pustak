const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: "sucess",
      results: doc.length,
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    if (!doc) {
      return next(new AppError("No document with that ID", 404));
    }
    res.status(200).json({
      status: "sucess",
      results: doc.length,
      data: {
        doc,
      },
    });
  });
