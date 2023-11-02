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

  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide");
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");

  let slideIndex = 0;

  // Show initial slide
  slides[slideIndex].classList.add("active");

  // Go to previous slide
  btnPrev.addEventListener("click", function () {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
  });

  // Go to next slide
  btnNext.addEventListener("click", function () {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  });
});
