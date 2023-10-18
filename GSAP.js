gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  let aboutMeSection = document.querySelector("#AboutMe");
  let aboutMeText = aboutMeSection.querySelector(".text");
  let pinContainer = document.querySelector("#pin-container");

  // First Animation: Fade in AboutMe Text
  gsap.fromTo(
    aboutMeText,
    { opacity: 0, x: -200 },
    {
      scrollTrigger: {
        trigger: aboutMeSection,
        start: "top center",
        toggleActions: "restart none none none",
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    }
  );

  // Create a timeline for the sliding sections
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinContainer,
      start: "top top",
      end: "+=500%",
      pin: true,
      scrub: true,
    },
  });

  tl.fromTo("#HTML", { xPercent: 100 }, { xPercent: -100, duration: 1 });
  tl.fromTo("#CSS", { xPercent: 100 }, { xPercent: -100, duration: 1 });
  tl.fromTo("#JS", { xPercent: 100 }, { xPercent: -100, duration: 1 });
  tl.fromTo("#GSAP", { xPercent: 100 }, { xPercent: -100, duration: 1 });
  tl.fromTo("#MoreAboutMe", { xPercent: 100 }, { xPercent: -100, duration: 1 });
});
