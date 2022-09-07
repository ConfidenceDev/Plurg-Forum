const { write, read } = require("../utils/file");
const Note = require("../data/note.json");

const nPath = "./data/note.json";

//============= DATA ====================
async function getNote() {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(Note.topic);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function writeNote(data) {
  return new Promise(async (resolve, reject) => {
    try {
      Note.topic = data.topic;
      await write(nPath, Note);
      resolve(Note);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports = {
  getNote,
  writeNote,
};
