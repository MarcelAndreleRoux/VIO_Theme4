document.addEventListener("DOMContentLoaded", function () {
  new fullpage("#fullpage", {
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
  });
});

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));

$("a[href^='#']").on("click", function (event) {
  var target = $($(this).attr("href"));
  if (target.length) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      1000
    );
  }
});
