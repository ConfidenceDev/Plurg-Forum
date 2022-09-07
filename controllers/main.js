function main(io, socket) {
  const sk = "sk_live_1ae5fba31d2c113768aabc2d749c5929e14b8b0a";
  const paystack = require("paystack")(sk);
  const { getNote, writeNote } = require("../models/main");

  const naira = process.env.NAIRA || 800;
  clearBuffer();

  //============= ONLINE ====================
  let count = io.sockets.server.engine.clientsCount;
  io.emit("online", { count: parseInt(count), naira });

  getNote().then(async (result) => {
    if (result) {
      socket.emit("note", result);
    }
  });

  //============= THREAD =====================
  socket.on("thread", async (data) => {
    if (data) {
      const date = new Date();
      const timestamp = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );

      const doc = {
        content: data,
        utc: new Date(timestamp),
      };

      io.volatile.emit("thread", doc);
    }
  });

  //============= UPDATE =====================
  socket.on("update", async (data) => {
    if (data) {
      paystack.transaction.verify(data.ref, (error, body) => {
        if (error) {
          console.log(error);
          return;
        }
        if (body.data.status === "success") {
          clearBuffer();
          writeNote(data)
            .then((result) => {
              io.volatile.emit("note", result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  });

  function clearBuffer() {
    socket.sendBuffer = [];
  }

  //============= DISCONNECT =================
  socket.on("disconnect", () => {
    let count = io.sockets.server.engine.clientsCount;
    io.emit("online", { count: parseInt(count), naira });
  });
}

module.exports = main;
