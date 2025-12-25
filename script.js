const notices = [
  { title: "Math Exam on Friday", category: "exam" },
  { title: "College Fest Tomorrow", category: "event" },
  { title: "Library Timing Update", category: "general" }
];

function goTo(page) {
  // hide all pages
  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });

  // show selected page
  const target = document.getElementById(page);
  if (target) {
    target.classList.remove("hidden");
  }

  // render notices when opening notices page
  if (page === "notices") {
    renderNotices();
  }

  // scroll to section
  target?.scrollIntoView({ behavior: "smooth" });
}

function generateQR() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Select a file first");
    return;
  }

  const url = URL.createObjectURL(file);
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(url);

  document.getElementById("qrResult").innerHTML =
    `<img src="${qrUrl}" alt="QR Code" />`;
}

function renderNotices() {
  const q = document.getElementById("search").value.toLowerCase();
  const c = document.getElementById("category").value;
  const list = document.getElementById("noticeList");

  list.innerHTML = notices
    .filter(n =>
      (c === "all" || n.category === c) &&
      n.title.toLowerCase().includes(q)
    )
    .map(n => `<div class="notice">${n.title}</div>`)
    .join("");
}
