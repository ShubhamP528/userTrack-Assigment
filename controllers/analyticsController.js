const Submission = require("../models/Submission");
const User = require("../models/User");
const FileUpload = require("../models/FileUpload");

exports.topUsers = async (req, res) => {
  const result = await Submission.aggregate([
    { $group: { _id: "$userId", totalSubmissions: { $sum: 1 } } },
    { $sort: { totalSubmissions: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        userId: "$_id",
        name: "$user.name",
        totalSubmissions: 1,
      },
    },
  ]);
  res.json(result);
};

exports.filesReport = async (req, res) => {
  const result = await Submission.aggregate([
    {
      $lookup: {
        from: "fileuploads",
        localField: "files",
        foreignField: "_id",
        as: "files",
      },
    },
    { $unwind: "$files" },
    {
      $group: {
        _id: { category: "$category", fileType: "$files.fileType" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.category",
        fileTypes: {
          $push: {
            k: "$_id.fileType",
            v: "$count",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        report: { $arrayToObject: "$fileTypes" },
      },
    },
  ]);

  const formatted = {};
  result.forEach((item) => {
    formatted[item.category] = item.report;
  });
  res.json(formatted);
};
