const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: [true, "Submission ID is required"],
  },
  fileType: {
    type: String,
    required: [true, "File type is required"],
  },
  fileUrl: {
    type: String,
    required: [true, "File URL is required"],
    trim: true,
  },
  fileMeta: {
    size: {
      type: Number,
      required: [true, "File size is required"],
    },
    dimensions: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
    pageCount: {
      type: Number,
    },
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FileUpload", fileUploadSchema);
