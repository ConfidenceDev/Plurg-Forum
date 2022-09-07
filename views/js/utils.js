const count = document.querySelector(".ac_count");
const topic = document.querySelector(".topic");
const editBtn = document.querySelector(".edit_btn");
const threadList = document.querySelector(".thread");
const writeField = document.querySelector(".write_field");
const writeBtn = document.querySelector(".write_btn");
const postEmail = document.querySelector(".post_email");
const postFieldCount = document.querySelector(".post_field_count");
const postContent = document.querySelector(".post_content");
const postProgress = document.querySelector(".progress");
const proceedBtn = document.querySelector(".proceed_btn");
const popMsg = document.querySelector(".pop_alert");

function payHash() {
  return "pk_live_d28c3c21cc450c5827da754af5d0cae7e513c3dd";
}

function toComma(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toFixed(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "t";
}

function generateUUID() {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function loadModal(loc) {
  const path = document.location.href.split("/")[0];
  if (path.includes("#")) {
    const tPath = path.split("#");
    window.location.assign(`${tPath[0]}#${loc}`);
  } else {
    window.location.assign(`${path}#${loc}`);
  }
}

function clearModal() {
  const path = document.location.href.split("/")[0];
  if (path.includes("#")) {
    const sPath = document.location.href.split("#")[0];
    window.location.assign(`${sPath}#`);
  } else {
    window.location.assign(`${path}#`);
  }
}

function showMsg(msg) {
  popMsg.innerText = msg;
  loadModal("popup_msg");
}
