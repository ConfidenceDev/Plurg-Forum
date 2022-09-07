const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const socket = io();
let naira = 800;

socket.on("online", (data) => {
  count.innerText = toComma(data.count);
  naira = parseInt(data.naira);
});

socket.on("note", (data) => {
  topic.innerText = data;
});

socket.on("thread", (data) => {
  if (data) {
    let li = document.createElement("li");
    addItem(data, li);
    threadList.scrollTop = threadList.scrollHeight;
  }
});

function addItem(data, li) {
  if (data.content) {
    li.innerHTML = `<li>
    <label class="thread_date">${data.utc}</label>
      <label class="thread_content"
        >${data.content}</label
      >
      <hr />
    </li>`;
    threadList.appendChild(li);
  }
}

writeField.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    writeBtn.click();
  }
});

writeBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const content = writeField.value;

  if (content) {
    socket.emit("thread", content);
    writeField.value = null;
  }
});

postContent.addEventListener("input", (e) => {
  const target = e.currentTarget;
  const currentLength = target.value.length;
  postFieldCount.innerText = `${currentLength}/127`;
});

proceedBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = postEmail.value;
  let topic = postContent.value;

  if (!email || !email.match(mailformat) || !topic) {
    showMsg("Enter a valid email address and topic!");
    return;
  }

  disableUI();

  try {
    const amt = 1 * parseInt(naira);
    topic = topic.replace(/\r?\n|\r/g, " ");
    const doc = {
      topic: topic,
    };

    credit(amt, email, doc);
  } catch (error) {
    console.log(error);
  }
});

function enableUI() {
  postEmail.enabled = true;
  postContent.enabled = true;
  proceedBtn.enabled = true;
  postProgress.style.opacity = 0;
}

function disableUI() {
  postEmail.enabled = false;
  postContent.enabled = false;
  proceedBtn.enabled = false;
  postProgress.style.opacity = 1;
}

function credit(amt, email, doc) {
  const handler = PaystackPop.setup({
    key: payHash(),
    email: email,
    amount: `${amt}00`,
    callback: (response) => {
      if (response.status == "success") {
        doc.ref = response.reference;
        socket.emit("update", doc);
        showMsg("Sent successfully!");
        enableUI();
      } else {
        showMsg("Something went wrong try again");
      }
    },
    onClose: function () {
      enableUI();
      showMsg("Transaction cancelled");
    },
  });
  handler.openIframe();
}
