// controllers/submissionController.js
const Submission = require("../models/Submission");
const FileUpload = require("../models/FileUpload");
const { extractMetadata } = require("../utils/metadataExtractor");
const path = require("path");

exports.createSubmission = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const files = req.files;

    if (!title || !description || !category || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing required fields or files." });
    }

    const submission = new Submission({
      title,
      description,
      category,
      userId: req.user.id,
      files: [],
      submittedAt: new Date(),
    });

    await submission.save();

    for (const file of files) {
      const filePath = path.join(__dirname, "../", file.path);
      const meta = await extractMetadata(file);
      const fileType = file.mimetype.startsWith("image") ? "image" : "pdf";

      const fileDoc = new FileUpload({
        submissionId: submission._id,
        fileType,
        fileUrl: `/uploads/${file.filename}`,
        fileMeta: meta,
        uploadedAt: new Date(),
      });

      await fileDoc.save();
      submission.files.push(fileDoc._id);
    }

    await submission.save();

    res.status(201).json({ message: "Submission created", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("userId", "name email")
      .populate("files");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
