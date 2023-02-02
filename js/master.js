// Check If There Is A Color In Local Storage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li ").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
let backgroundOption = true;
let backgroundInterval;

// Check If There Is A Background Option In Local Storage
let backgroundLocalOption = localStorage.getItem("background-option");
if (backgroundLocalOption !== null) {
  if (backgroundLocalOption === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove All Active Classes From All Spans
  document.querySelectorAll(".background-random span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalOption === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}
// set-icon onclick
document.querySelector(".toggle-setting i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

// Swich color
let colorList = document.querySelectorAll(".colors-list li");
colorList.forEach((e) => {
  e.addEventListener("click", (li) => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.target.dataset.color
    );
    localStorage.setItem("color-option", li.target.dataset.color);
    li.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    li.target.classList.add("active"); ///
  });
});

// Swich Random Background
let span = document.querySelectorAll(".background-random span");
span.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizImgs();
      localStorage.setItem("background-option", backgroundOption);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", backgroundOption);
    }
  });
});
// Select landing page
let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizImgs() {
  backgroundInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imagesArray.length);
    landingPage.style.backgroundImage =
      'url("imgs/' + imagesArray[randomNumber] + '")';
  }, 1000);
}

// Skills Scroller
let skills = document.querySelector(".skills");

window.onscroll = function () {
  let heightAboveSkills = skills.offsetTop;
  let heightOfSkills = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScroller = window.scrollY;
  if (
    windowScroller >
    heightAboveSkills + heightOfSkills - windowHeight - 200
  ) {
    document.querySelectorAll(".skills span").forEach((skill) => {
      skill.style.width = skill.dataset.width;
    });
  }
};

// Create Imge popup

let ourGallery = document.querySelectorAll(".gallery .imge-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // popup parent
    let popup = document.createElement("div");
    popup.className = "popup";
    document.body.appendChild(popup);
    // creat overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay-style";
    popup.appendChild(overlay);
    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // create title of img
    if (img.alt !== null) {
      let titleImge = document.createElement("h3");
      let textTitle = document.createTextNode(img.alt);
      titleImge.appendChild(textTitle);
      popupBox.appendChild(titleImge);
    }
    // create img in popupBox
    let popupImge = document.createElement("img");
    popupImge.className = "popup-img";
    popupImge.src = img.src;
    popupBox.appendChild(popupImge);
    popup.appendChild(popupBox);
    // create close button
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeText = document.createTextNode("X");
    closeButton.appendChild(closeText);
    popupBox.appendChild(closeButton);
  });
});
// close button
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    document.querySelector(".popup").remove();
  }
});

const bullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li");
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(bullets);
scrollToSection(allLinks);
// show bullets
let bulletSpan = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet-option")
if (bulletLocalItem !== null) {
  bulletSpan.forEach(span => {
    span.classList.remove("active")
  })
  if (bulletLocalItem === 'block') {
    navBullets.style.display = 'block'
    document.querySelector(".bullets-option .yes").classList.add("active")
  } else {
    navBullets.style.display = 'none'
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}

bulletSpan.forEach(span => {
  span.addEventListener('click', e => {
    if (span.dataset.display == 'show'){
      navBullets.style.display = 'block'
      localStorage.setItem('bullet-option', 'block')
    } else {
      navBullets.style.display = 'none'  
      localStorage.setItem('bullet-option', 'none')
    }
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active")
    })
    e.target.classList.add("active")
  })
})

// Reset Button 
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear()
  window.location.reload()
}


// toggle menu 
let toggleBtn = document.querySelector(".toggle-menu")
let myLinks = document.querySelector(".links")
toggleBtn.onclick = function (e) {
  e.stopPropagation()
  this.classList.toggle("menu-active")
  myLinks.classList.toggle("open")
}
myLinks.onclick = function (e) {
  e.stopPropagation()
}
// close toggle menu 
document.addEventListener('click', e => {
  if (e.target !== toggleBtn && e.target !== myLinks){
    if (myLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active")
      myLinks.classList.toggle("open")
    }
  }
})