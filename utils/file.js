const fs = require("fs");
const { resolve } = require("path");

async function write(path, file) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(path, JSON.stringify(file), "utf8", (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}

async function read(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path, "utf8", (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = {
  write,
  read,
};
