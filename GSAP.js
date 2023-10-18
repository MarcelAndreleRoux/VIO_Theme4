gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  let aboutMeSection = document.querySelector("#AboutMe");
  let aboutMeText = aboutMeSection.querySelector(".text");

  gsap.fromTo(
    aboutMeText,
    { opacity: 0, x: -200 },
    {
      scrollTrigger: {
        trigger: aboutMeSection,
        start: "top center",
        markers: true,
        toggleActions: "restart none none none",
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    }
  );

  gsap.to("#extra-container", {
    scrollTrigger: {
      trigger: "#AboutMe",
      start: "top top",
      end: "+=200%" /* This line is adjusted */,
      pin: true /* This line is added */,
      scrub: true /* This line is added */,
      markers: true,
    },
    x: "0%",
    ease: "power2.out",
  });
});
