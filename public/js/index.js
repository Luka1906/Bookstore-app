window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header-section a");
  const currentPage = window.location.pathname.split(",").pop();
  const luka = document.querySelector("luka")

  links.forEach((link) => {
    link.classList.remove("active");
  });

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

 



  
});

