var currentUrl = window.location.href;

if (currentUrl.includes("Theme3")) {
  console.log("Theme 3");
  initializeVideos();
}

if (currentUrl.includes("Theme2")) {
  console.log("Theme 2");
  Theme2();
}

function myFunction() {
  const dropdown = document.getElementById("myDropdown");
  const buttonIcon = document.querySelector(".dropbtn i");

  if (dropdown.classList.contains("show")) {
    const links = dropdown.querySelectorAll("a");

    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("fade-out-link");
        link.classList.remove("animate-link");
      }, 100 * (index + 1));
    });

    // After all items fly out, animate dropdown retracting
    setTimeout(() => {
      dropdown.classList.remove("dropdown-animate"); // Start the retract animation

      setTimeout(() => {
        dropdown.classList.remove("show");
        links.forEach((link) => {
          link.classList.remove("fade-out-link");
        });
      }, 300); // Wait for the animation to finish before completely hiding
    }, 100 * (links.length + 1) + 100);

    buttonIcon.className = "fa-solid fa-bars";
  } else {
    dropdown.classList.add("show");

    setTimeout(() => {
      dropdown.classList.add("dropdown-animate"); // Start the show animation
    }, 10); // Small delay to ensure the DOM update happens first

    const links = dropdown.querySelectorAll("a");
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("animate-link");
      }, 100 * (index + 1));
    });

    buttonIcon.className = "fa-solid fa-xmark";
  }
}

let targetSection = null;

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = event.currentTarget.getAttribute("href");

    if (href.startsWith("#")) {
      targetSection = href;
    }
  });
});

let isAnimating = false;

function closeDropdown() {
  if (isAnimating) return;

  const dropdowns = document.getElementsByClassName("dropdown-content");

  for (let i = 0; i < dropdowns.length; i++) {
    let openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      isAnimating = true;

      openDropdown.querySelectorAll("a").forEach((link, index) => {
        setTimeout(() => {
          link.classList.add("fade-out-link");
          link.classList.remove("animate-link");
        }, 100 * (index + 1));
      });

      setTimeout(() => {
        openDropdown.classList.remove("show");
        openDropdown.querySelectorAll("a").forEach((link) => {
          link.classList.remove("fade-out-link");
        });
        const buttonIcon = document.querySelector(".dropbtn i");
        buttonIcon.className = "fa-solid fa-bars";

        isAnimating = false;
      }, 300 + 100 * openDropdown.querySelectorAll("a").length);
    }
  }
}

document.querySelectorAll(".dropdown-content a").forEach((link) => {
  link.addEventListener("click", closeDropdown);
});

window.onclick = function (event) {
  if (event.target.matches(".dropbtn") && event.target.matches(".fa-bars")) {
    closeDropdown();
  }
};

// gsap scroll

gsap.registerPlugin(ScrollTrigger);

let myText1 = new SplitType("#my-text-1");
let myText2 = new SplitType("#my-text-2");
let myText3 = new SplitType("#my-text-3");
let myText4 = new SplitType("#my-text-4");

function applyAnimation(id) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: id,
      start: "-250% 70%",
      end: "250% 20%",
      toggleActions: "play reset play reset",
    },
  });

  tl.to(id + " .char", {
    y: 0,
    stagger: 0.05,
    duration: 0.07,
  });
}

applyAnimation("#my-text-1");
applyAnimation("#my-text-2");
applyAnimation("#my-text-3");
applyAnimation("#my-text-4");

// barba & GSAP

function pageTransition() {
  var tl = gsap.timeline();

  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "top left",
    stagger: 0.2,
  });

  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 0,
    transformOrigin: "top left",
    stagger: 0.1,
    delay: 0.1,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        window.scrollTo(0, 0);
        pageTransition();
        await delay(1200);
        done();
      },
    },
  ],
});

barba.hooks.after(() => {
  currentUrl = window.location.href;

  if (currentUrl.includes("Theme3")) {
    console.log("Theme 3");
    initializeVideos();
  } else if (currentUrl.includes("Theme2")) {
    console.log("Theme 2");
    Theme2();
  } else {
    console.log("Theme 1");
    // Reinitialize SplitType for the texts
    myText1 = new SplitType("#my-text-1");
    myText2 = new SplitType("#my-text-2");
    myText3 = new SplitType("#my-text-3");
    myText4 = new SplitType("#my-text-4");

    // Reapply animations
    applyAnimation("#my-text-1");
    applyAnimation("#my-text-2");
    applyAnimation("#my-text-3");
    applyAnimation("#my-text-4");

    if (targetSection) {
      const section = document.querySelector(targetSection);

      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }

      targetSection = null;
    }

    document.querySelectorAll(".dropdown-content a").forEach((link) => {
      link.addEventListener("click", closeDropdown);
    });

    window.onclick = function (event) {
      if (
        event.target.matches(".dropbtn") &&
        event.target.matches(".fa-bars")
      ) {
        closeDropdown();
      }
    };

    if (currentUrl.includes("index.html")) {
      document
        .getElementById("sendEmail")
        .addEventListener("click", function () {
          const button = this;
          const successResponse = document.querySelector(".success-responce");
          const inputs = document.querySelectorAll(
            ".custom-input, .custom-input-message"
          );

          // Start the loading effect
          button.style.position = "relative";
          button.classList.add("loading");

          setTimeout(() => {
            // Show the success message after 3 seconds (loading bar completion)
            successResponse.style.display = "block";

            // Hide the success message after 2 more seconds
            setTimeout(() => {
              successResponse.style.display = "none";

              // Clear the inputs
              inputs.forEach((input) => {
                input.value = "";
              });

              // Reset the button's state
              button.classList.remove("loading");
            }, 2000);
          }, 3000);
        });
    }
  }

  // Refresh ScrollTrigger instances
  ScrollTrigger.refresh();
});

// skills gsap

gsap.registerPlugin(ScrollTrigger);

document
  .querySelectorAll(".item-expert, .item-intermediate, .item-novice")
  .forEach((item) => {
    gsap.from(item, { opacity: 0, duration: 0.5 });
  });

// send email

if (currentUrl.includes("index.html")) {
  document.getElementById("sendEmail").addEventListener("click", function () {
    const button = this;
    const successResponse = document.querySelector(".success-responce");
    const inputs = document.querySelectorAll(
      ".custom-input, .custom-input-message"
    );

    // Start the loading effect
    button.style.position = "relative";
    button.classList.add("loading");

    setTimeout(() => {
      // Show the success message after 3 seconds (loading bar completion)
      successResponse.style.display = "block";

      // Hide the success message after 2 more seconds
      setTimeout(() => {
        successResponse.style.display = "none";

        // Clear the inputs
        inputs.forEach((input) => {
          input.value = "";
        });

        // Reset the button's state
        button.classList.remove("loading");
      }, 2000);
    }, 3000);
  });
}

// theme 2 code

function Theme2() {
  $(document).ready(function () {
    const btnBio = document.querySelector(".btn-bio");
    const btnStats = document.querySelector(".btn-stats");
    const characterBio = document.querySelector(".character-bio");
    const characterStats = document.querySelector(".character-stats");
    const characterInfo = document.querySelector(".character-info");

    // Show character bio on button click
    btnBio.addEventListener("click", function () {
      characterStats.classList.remove("active");
      characterBio.classList.add("active");
    });

    // Show character stats on button click
    btnStats.addEventListener("click", function () {
      characterBio.classList.remove("active");
      characterStats.classList.add("active");
    });

    document
      .querySelector(".one-shot img:last-child")
      .classList.add("shakeAnimation");

    document.querySelector(".gun").style.display = "none";
    document.querySelector(".no-click").style.display = "block";
    document.querySelector(".panel").style.display = "none";

    var pContainerHeight = $(".city-box").height();

    $(window).scroll(function () {
      var wScroll = $(this).scrollTop();

      if (wScroll <= pContainerHeight) {
        $(".logo").css({
          transform: "translate(-50%, " + (-50 + wScroll / 80) + "%)",
        });
      }
    });

    $(document).ready(function () {
      $(".Lizzie").hover(
        function () {
          $(".character-1-data").css("opacity", "1");
        },
        function () {
          $(".character-1-data").css("opacity", "0");
        }
      );

      $(".Himer").hover(
        function () {
          $(".character-2-data").css("opacity", "1");
        },
        function () {
          $(".character-2-data").css("opacity", "0");
        }
      );
    });

    var currentSlide = 0;
    var totalSlides = $(".author-box > div").length;

    $(".next").click(function () {
      $(`.author-box > div:eq(${currentSlide})`).hide();
      currentSlide = (currentSlide + 1) % totalSlides;
      $(`.author-box > div:eq(${currentSlide})`).show();
    });

    $(".prev").click(function () {
      $(`.author-box > div:eq(${currentSlide})`).hide();
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      $(`.author-box > div:eq(${currentSlide})`).show();
    });

    let gunClicked = false;

    document
      .querySelector(".one-shot img:first-child")
      .addEventListener("click", function () {
        console.log("Character clicked");

        let gunImg = document.querySelector(".one-shot img:last-child");

        gunImg.classList.remove("shakeAnimation");
        gunImg.classList.add("gunDropped");
        gunClicked = true;

        // Wait for the drop animation to complete before showing the gun/no-click images
        gunImg.addEventListener("animationend", () => {
          let gun = document.querySelector(".gun");
          let panel = document.querySelector(".panel");
          let noClick = document.querySelector(".no-click");
          let gunData = document.querySelector(".gunData");
          let prevGun = document.querySelector(".oneshot-gun");

          // Decide which to show based on gunClicked
          if (gunClicked) {
            gun.style.display = "block";
            panel.style.display = "block";
            noClick.style.display = "none";
            gunData.style.display = "block";
            prevGun.style.display = "none";
          } else {
            gun.style.display = "none";
            panel.style.display = "none";
            noClick.style.display = "block";
            prevGun.style.display = "block";
          }
        });
      });

    document.querySelectorAll(".marker").forEach(function (marker) {
      marker.addEventListener("mouseover", function () {
        this.nextElementSibling.style.display = "block";
      });

      marker.addEventListener("mouseout", function () {
        this.nextElementSibling.style.display = "none";
      });
    });
  });
}
// theme 3 code

function initializeVideos() {
  const autoplay =
    new URLSearchParams(window.location.search).get("autoplay") === "true";
  const videoSections = document.querySelectorAll(".video-section");

  videoSections.forEach((section, index) => {
    const videoSrc = section.dataset.videoSrc;
    const video = document.createElement("video");
    video.className = "full-page-video";
    video.innerHTML = `<source src="${videoSrc}" type="video/mp4">Your browser does not support the video tag.`;

    section.appendChild(video);

    // GSAP ScrollTrigger setup for this video
    ScrollTrigger.create({
      trigger: section,
      start: "top center", // Adjust as needed
      end: "bottom center", // Adjust as needed
      onEnter: () => video.play(),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play(),
      onLeaveBack: () => video.pause(),
    });

    // Autoplay the first video if the parameter is set
    if (autoplay && index === 0) {
      video.play();
    }
  });
}
