// WealthGrid main JS file
document.addEventListener("DOMContentLoaded", function () {
  // Navbar hamburger sidemenu
  const toggle = document.getElementById("navbar-toggle");
  const menu = document.getElementById("navbar-menu");
  function addCloseBtn() {
    if (!document.getElementById("navbar-close")) {
      const closeBtn = document.createElement("button");
      closeBtn.className = "navbar-close-btn";
      closeBtn.id = "navbar-close";
      closeBtn.setAttribute("aria-label", "Close menu");
      closeBtn.innerHTML = "&times;";
      closeBtn.onclick = function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
      };
      menu.insertBefore(closeBtn, menu.firstChild);
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.classList.toggle("open");
      if (menu.classList.contains("open")) addCloseBtn();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        menu.classList.remove("open");
        toggle.classList.remove("open");
      }
    });
  }

  // Hero carousel auto-rotation
  const slides = document.querySelectorAll(".carousel-slide");
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  if (slides.length) {
    showSlide(currentSlide);
    setInterval(nextSlide, 4000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // Inject SVG Sprite
  function injectSvgSprite(path) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", path, true);
    ajax.send();
    ajax.onload = function (e) {
      var div = document.createElement("div");
      div.className = "d-none";
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    };
  }
  injectSvgSprite(
    "https://demo.bootstrapious.com/directory/1-4/icons/orion-svg-sprite.svg"
  );

  // Coin rotator (if present)
  if (
    window.jQuery &&
    document.getElementById("coin") &&
    document.getElementById("coinImage")
  ) {
    var x = 0;
    setInterval(function () {
      var coins = [
        "es.png",
        "eth.html",
        "ap.html",
        "dash.html",
        "gg.html",
        "xrp.html",
        "es.html",
        "ltc.html",
        "ms.html",
        "btc.png",
      ];
      $("#coin").css("transform", "rotateY(180deg)");
      setTimeout(function () {
        $("#coinImage").attr("src", "images/coins/" + coins[x] + "");
      }, 430);
      setTimeout(function () {
        $("#coin").css("transform", "rotateY(0deg)");
      }, 440);
      x++;
      if (x > coins.length - 1) {
        x = 0;
      }
    }, 4000);
  }

  // FAQ typewriter effect (if present)
  if (document.getElementById("txt")) {
    var i = 0;
    var b = 0;
    setInterval(function () {
      var msg = [
        "Stocks",
        "CDFs on Fx",
        "Real Estate",
        "Oil and Gas",
        "Cryptocurrency",
      ];
      if (b > msg.length - 1) {
        b = 0;
      }
      typeWriter(msg[b]);
      b++;
    }, 8000);
    function typeWriter(x) {
      var speed = x.length / 0.09;
      if (i < x.length) {
        document.getElementById("txt").innerHTML += x.charAt(i);
        i++;
        setTimeout(typeWriter, speed, x);
      } else {
        i = 0;
        x = "";
        setTimeout(function () {
          document.getElementById("txt").innerHTML = x;
        }, 5000);
      }
    }
  }

  // Scroll-to-top button (if present)
  var mybutton = document.getElementById("goUp");
  if (mybutton) {
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    mybutton.onclick = function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  }

  // Clock display (if present)
  if (document.getElementById("MyClockDisplay")) {
    function showTime() {
      var date = new Date();
      var h = date.getHours(); // 0 - 23
      var m = date.getMinutes(); // 0 - 59
      var s = date.getSeconds(); // 0 - 59
      var session = "AM";
      if (h === 0) {
        h = 12;
      }
      if (h > 12) {
        h = h - 12;
        session = "PM";
      }
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      var time = h + " : " + m + " : " + s + " " + session;
      document.getElementById("MyClockDisplay").innerText = time;
      document.getElementById("MyClockDisplay").textContent = time;
      setTimeout(showTime, 1000);
    }
    showTime();
  }

  // Currency converter (if present)
  window.btc_to_usd = function (valNum) {
    var calc = valNum * 22511.31;
    if (document.getElementById("val_usd")) {
      document.getElementById("val_usd").value = calc.toFixed(2);
    }
  };
  window.usd_to_btc = function (valNum) {
    var calc = valNum / 22511.31;
    if (document.getElementById("val_btc")) {
      document.getElementById("val_btc").value = calc.toFixed(8);
    }
  };

  // Utility: triggerClick and clickableDiv
  window.triggerClick = function (x) {
    document.querySelector(x).click();
  };
  window.clickableDiv = function (url) {
    window.location.href = url;
  };
});
