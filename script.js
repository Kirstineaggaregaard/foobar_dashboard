"use strict";
let endpoint = "https://kirchrinew2.herokuapp.com/";
const URL = "https://kirchrinew2.herokuapp.com/";
const endpoint2 = "https://frontend-8e4d.restdb.io/";
// const people = document.querySelector(".people");
let intervalId;
const apiKey = "5e9961cb436377171a0c24cc";
let timeout;
let time;

const order = {
  name: "",
  count: 0,
};

// const data = {
//   name: bartenders.name,
//   queue: queue.length,
// };

window.addEventListener("load", () => {
  console.log("running");
  setInterval(fetchData, 5000);
  start();
});

function start() {
  getPictures();
}

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
  //   console.log(data);

  const dest = document.querySelector("#liste");
  const temp = document.querySelector(".template_serving");
  const dest2 = document.querySelector("#liste2");
  const temp2 = document.querySelector(".template_prepared");
  const dest3 = document.querySelector("#liste3");
  const temp3 = document.querySelector(".template_bartenders");
  const pep = data.queue;

  //YOUR FAVORITE ATM
  //   if (pep.length > 1) {
  //     const order1 = pep[0].order;
  //     const order2 = pep[1].order;
  //     const firstTwoOrders = order1.concat(order2);
  //     console.log(firstTwoOrders);
  //   }
  if (pep.length > 2) {
    const order1 = pep[0].order;
    const order2 = pep[1].order;
    const order3 = pep[2].order;
    const firstThree = order1.concat(order2, order3);
    // const lastOrders = order3.concat(order4);
    // const allOrders = firstTwoOrders.concat(allOrders);
    const order = firstThree;
    // const orderData = JSON.stringify(order);
    // console.log(orderData);
    let counts = order.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter((k) => counts[k] === maxCount);

    console.log("most popular" + mostFrequent);
    console.log(mostFrequent);
    console.log(order);

    if (mostFrequent.length == 1) {
      document.querySelector(".favorite_name").textContent = mostFrequent;
    }
    if (mostFrequent.length > 1) {
      document.querySelector(".favorite_name").textContent = mostFrequent[0];
    }
    checkFavorite();
  }

  //   console.log(lastOrders);

  const orderArray = pep.order;
  const tenders = data.bartenders;
  //   console.log(pep[0].order);
  //   console.log(pep[1].order);
  //   console.log(pep[2].order);
  dest.textContent = "";
  dest2.textContent = "";
  dest3.textContent = "";
  const numbers = data.serving;
  console.log("wanna show");
  //   document.querySelector(".people").textContent = data.queue.length;
  //   dest.textContent = "";

  if (pep.length == 1) {
    document.querySelector(".pep1").src = "/pep1.svg";
    document.querySelector(".pep2").src = "";
    document.querySelector(".pep3").src = "";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }
  if (pep.length == 2) {
    document.querySelector(".pep1").src = "/pep1.svg";

    document.querySelector(".pep2").src = "/pep2.svg";
    document.querySelector(".pep3").src = "";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }
  if (pep.length == 3) {
    document.querySelector(".pep1").src = "/pep1.svg";

    document.querySelector(".pep2").src = "/pep2.svg";
    document.querySelector(".pep3").src = "/pep3.svg";
    document.querySelector(".pep4").src = "";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }

  if (pep.length == 4) {
    document.querySelector(".pep1").src = "/pep1.svg";

    document.querySelector(".pep2").src = "/pep2.svg";
    document.querySelector(".pep3").src = "/pep3.svg";
    document.querySelector(".pep4").src = "/pep4.svg";
    document.querySelector(".pep5").src = "";
    document.querySelector(".pep6").src = "";
  }

  if (pep.length == 5) {
    document.querySelector(".pep1").src = "/pep1.svg";

    document.querySelector(".pep2").src = "/pep2.svg";
    document.querySelector(".pep3").src = "/pep3.svg";
    document.querySelector(".pep4").src = "/pep4.svg";
    document.querySelector(".pep5").src = "/pep5.svg";
  }

  if (pep.length == 6) {
    document.querySelector(".pep1").src = "/pep1.svg";

    document.querySelector(".pep2").src = "/pep2.svg";
    document.querySelector(".pep3").src = "/pep3.svg";
    document.querySelector(".pep4").src = "/pep4.svg";
    document.querySelector(".pep5").src = "/pep5.svg";
    document.querySelector(".pep6").src = "/pep6.svg";
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

    if (tender.name == "Peter") {
      klon.querySelector(".bartender_pic").src = "/madsm.png";
    }

    if (tender.name == "Dannie") {
      klon.querySelector(".bartender_pic").src = "/leo.png";
    }

    if (tender.name == "Jonas") {
      klon.querySelector(".bartender_pic").src = "/george.png";
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

function checkFavorite() {
  if (document.querySelector(".favorite_name").textContent == "El Hefe") {
    console.log("el hefe tekst");
    document.querySelector(".favorite_text").textContent = "Refreshing wheat or rye beers that can display more hop character and less yeast character than their German cousins";
  } else if (document.querySelector(".favorite_name").textContent == "Movintime") {
    console.log("movin tekst");
    document.querySelector(".favorite_text").textContent =
      "Smooth, clean, and rather rich, with a depth of malt character.  This is one of the classic malty styles, with a maltiness that is often described as soft, complex, and elegant but never cloying";
    // movinText();
  } else if (document.querySelector(".favorite_name").textContent == "Row 26") {
    console.log("26 tekst");
    document.querySelector(".favorite_text").textContent = "A hoppy, bitter, strongly roasted Foreign-style Stout (of the export variety)";
    // rowText();
  } else if (document.querySelector(".favorite_name").textContent == "Hoppily Ever After") {
    document.querySelector(".favorite_text").textContent = "A decidedly hoppy and bitter, moderately strong American pale ale";
    console.log("26 tekst");
  } else if (document.querySelector(".favorite_name").textContent == "Steampunk") {
    document.querySelector(".favorite_text").textContent = "A lightly fruity beer with firm, grainy maltiness, interesting toasty and caramel flavors, and showcasing the signature Northern Brewer varietal hop character";
    console.log("steam tekst");
  } else if (document.querySelector(".favorite_name").textContent == "Sleighride") {
    document.querySelector(".favorite_text").textContent = "This category encompasses a wide range of Belgian ales produced by truly artisanal brewers more concerned with creating unique products than in increasing sales";
    console.log("sleigh tekst");
  } else if (document.querySelector(".favorite_name").textContent == "Ruined Childhood") {
    document.querySelector(".favorite_text").textContent = "This category encompasses a wide range of Belgian ales produced by truly artisanal brewers more concerned with creating unique products than in increasing sales";
    console.log("sleigh tekst");
  } else if (document.querySelector(".favorite_name").textContent == "Fairy Tale Ale") {
    document.querySelector(".favorite_text").textContent = "A decidedly hoppy and bitter, moderately strong American pale ale";
    console.log("sleigh tekst");
  } else if (document.querySelector(".favorite_name").textContent == "Githop") {
    document.querySelector(".favorite_text").textContent = "A decidedly hoppy and bitter, moderately strong American pale ale";
  } else if (document.querySelector(".favorite_name").textContent == "Hollaback Lager") {
    document.querySelector(".favorite_text").textContent =
      "Smooth, clean, and rather rich, with a depth of malt character.  This is one of the classic malty styles, with a maltiness that is often described as soft, complex, and elegant but never cloying";
  }
}

function getPictures() {
  //   document.querySelector("main").innerHTML = "";
  fetch(endpoint2 + "rest/pictures", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charrset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showPicture);
  //do stuff with the data
}

function showPicture(pictures) {
  console.log(pictures);
  const data = pictures;
  const data1 = data[2];

  console.log(data);
  console.log(data1);

  document.querySelector(".database_img").src = endpoint2 + "media/" + data1.picture;
  setTimeout(() => {
    changeImage(pictures);
  }, 4000);

  //   timeout = setTimeout(removePhoto(pictures), 8000);
  //   setInterval(changeImage(pictures), 30000);
}

function changeImage(pictures) {
  console.log("chaaaange");
  const data = pictures;
  const datapic2 = data[1];

  document.querySelector(".database_img").src = endpoint2 + "media/" + datapic2.picture;
  setTimeout(() => {
    showPicture(pictures);
  }, 4000);
}

// function hefeText() {
//   console.log("hefetext");
//   document.querySelector(".favorite_text").textContent = "El Hefe";
// }

// function movinText() {
//   document.querySelector(".favorite_text").textContent = "movin";
// }

// function rowText() {
//   document.querySelector(".favorite_text").textContent = "row";
// }
