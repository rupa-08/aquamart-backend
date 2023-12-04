let fs = require("fs");

const deleteImage = (image) => {
  //rmdir => delete empty directory
  //unlink => delete file

  if (image) {
    let path = process.cwd() + "/public/images/" + image;

    return fs.unlinkSync(path);
  } else {
    return null;
  }
};

module.exports = { deleteImage };
