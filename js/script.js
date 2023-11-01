function myFunction() {
  const dropdown = document.getElementById("myDropdown");
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  } else {
    window.location.href = "index.html";
  }

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

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.querySelectorAll("a").forEach((link, index) => {
          setTimeout(() => {
            link.classList.add("fade-out-link");
            link.classList.remove("animate-link");
          }, 100 * (index + 1));
        });

        setTimeout(() => {
          openDropdown.classList.remove("show");
          openDropdown
            .querySelectorAll("a")
            .forEach((link) => link.classList.remove("fade-out-link"));
          const buttonIcon = document.querySelector(".dropbtn i");
          buttonIcon.className = "fa-solid fa-bars";
        }, 300 + 100 * openDropdown.querySelectorAll("a").length);
      }
    }
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

// swup & GSAP

document.addEventListener("swup:contentReplaced", function () {
  const currentPage = window.location.pathname;
  const dropbtn = document.querySelector(".dropbtn i");

  if (currentPage.endsWith("skills.html")) {
    dropbtn.classList.remove("fa-bars");
    dropbtn.classList.add("fa-arrow-left");
  } else {
    dropbtn.classList.remove("fa-arrow-left");
    dropbtn.classList.add("fa-bars");
  }
});

const transition = {
  from: "(.*)",
  to: "(.*)",
  out: (done) => {
    console.log("Out transition");
    const container = document.querySelector("#swup");
    gsap.to(container, {
      x: "-150%",
      opacity: 0,
      duration: 1.2,
      onComplete: done,
    });
  },
  in: (done) => {
    console.log("In transition");
    const container = document.querySelector("#swup");
    gsap.from(container, {
      x: "100%",
      opacity: 0,
      duration: 0.8,
      onComplete: done,
    });
  },
};

const swup = new Swup({
  plugins: [new SwupJsPlugin({ animations: [transition] })],
});

// skills gsap

gsap.registerPlugin(ScrollTrigger);

document
  .querySelectorAll(".item-expert, .item-intermediate, .item-novice")
  .forEach((item) => {
    gsap.from(item, { opacity: 0, duration: 0.5 });
  });
