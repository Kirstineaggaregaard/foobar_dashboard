"use strict";
let endpoint = "https://kirchris.herokuapp.com/";
const URL = "https://kirchris.herokuapp.com/";
const people = document.querySelector(".people");
let intervalId;

// const data = {
//   name: bartenders.name,
//   queue: queue.length,
// };

window.addEventListener("load", () => {
  console.log("running");
  fetchData();
  setInterval(fetchData, 5000);
});

function get() {
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charrset=utf-8",
    },
  })
    .then((e) => e.json())
    .then(showData);
  //do stuff with the data
}

get();

function fetchData() {
  fetch(URL)
    .then((res) => res.json())
    .then(showData);
}

function showData(data) {
  console.log(data);
  const dest = document.querySelector("#liste");
  const temp = document.querySelector(".template_serving");
  const dest2 = document.querySelector("#liste2");
  const temp2 = document.querySelector(".template_prepared");
  const dest3 = document.querySelector("#liste3");
  const temp3 = document.querySelector(".template_bartenders");
  const pep = data.queue;
  const tenders = data.bartenders;
  dest.textContent = "";
  dest2.textContent = "";
  dest3.textContent = "";
  const numbers = data.serving;
  console.log("wanna show");
  document.querySelector(".people").textContent = data.queue.length;
  //   dest.textContent = "";

  if (pep.length == 1) {
    document.querySelector(".pep1").src = "/pep1.png";
    document.querySelector(".pep2").src = "";
    document.querySelector(".pep3").src = "";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }
  if (pep.length == 2) {
    document.querySelector(".pep1").src = "/pep1.png";

    document.querySelector(".pep2").src = "/pep2.png";
    document.querySelector(".pep3").src = "";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }
  if (pep.length == 3) {
    document.querySelector(".pep1").src = "/pep1.png";

    document.querySelector(".pep2").src = "/pep2.png";
    document.querySelector(".pep3").src = "/pep3.png";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }

  if (pep.length == 4) {
    document.querySelector(".pep1").src = "/pep1.png";

    document.querySelector(".pep2").src = "/pep2.png";
    document.querySelector(".pep3").src = "/pep3.png";
    document.querySelector(".pep4").src = "/pep4.png";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }

  if (pep.length == 5) {
    document.querySelector(".pep1").src = "/pep1.png";

    document.querySelector(".pep2").src = "/pep2.png";
    document.querySelector(".pep3").src = "/pep3.png";
    document.querySelector(".pep4").src = "/pep4.png";
    document.querySelector(".pep5").src = "/pep5.png";
  }

  if (pep.length == 6) {
    document.querySelector(".pep1").src = "/pep1.png";

    document.querySelector(".pep2").src = "/pep2.png";
    document.querySelector(".pep3").src = "/pep3.png";
    document.querySelector(".pep4").src = "/pep4.png";
    document.querySelector(".pep5").src = "/pep5.png";
    document.querySelector(".pep6").src = "/pep6.png";
  }

  if (pep.length == 0) {
    document.querySelector(".pep1").src = "";

    document.querySelector(".pep2").src = "";
    document.querySelector(".pep3").src = "";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }

  numbers.forEach((number) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".being_served").textContent = number.id;

    dest.appendChild(klon);
  });

  tenders.forEach((tender) => {
    const klon = temp3.cloneNode(true).content;
    klon.querySelector(".bartender_name").textContent = tender.name;
    if (tender.status == "WORKING") {
      klon.querySelector(".bartender_status").style.backgroundColor = "red";
    }
    if (tender.status == "READY") {
      klon.querySelector(".bartender_chat").textContent = "Up for a chat?";
    }
    dest3.appendChild(klon);
  });

  pep.forEach((number) => {
    const klon = temp2.cloneNode(true).content;
    klon.querySelector(".being_prepared").textContent = number.id;
    if (pep.length > 4) {
      pep.length = 4;
    }
    dest2.appendChild(klon);
  });
  // showTaps(data);
}
