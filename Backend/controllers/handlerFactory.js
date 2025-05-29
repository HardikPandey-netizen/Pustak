const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.create(req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        tour: newdoc,
      },
    }); //we have async writeFile because we do not want to block the event loop in the callback function
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });
