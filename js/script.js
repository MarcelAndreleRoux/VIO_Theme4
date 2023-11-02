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
        await delay(1500);
        done();
      },
    },
  ],
});

barba.hooks.after(() => {
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

  // Refresh ScrollTrigger instances
  ScrollTrigger.refresh();

  setTimeout(() => {
    window.location.reload();
  }, 1800);
});

// skills gsap

gsap.registerPlugin(ScrollTrigger);

document
  .querySelectorAll(".item-expert, .item-intermediate, .item-novice")
  .forEach((item) => {
    gsap.from(item, { opacity: 0, duration: 0.5 });
  });

//send email

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
