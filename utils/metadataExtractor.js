const { imageSizeFromFile } = require("image-size/fromFile");
const fs = require("fs");
const pdf = require("pdf-parse");

exports.extractMetadata = async (file) => {
  const metadata = {
    size: fs.statSync(file.path).size,
    dimensions: null,
    pageCount: null,
  };

  if (file.mimetype.startsWith("image/")) {
    const dims = await imageSizeFromFile(file.path);
    metadata.dimensions = { width: dims.width, height: dims.height };
  }

  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdf(dataBuffer);
    metadata.pageCount = pdfData.numpages;
  }

  return metadata;
};
