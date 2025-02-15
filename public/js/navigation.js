export const setUpNavigation = () => {
  const links = document.querySelectorAll(".header-section a");
  const currentPage = window.location.pathname.split(",").pop();

  links.forEach((link) => {
    link.classList.remove("active");
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentPage ||
        (currentPage.startsWith("/book") &&
          link.classList.contains("home-page"))
    );
  });
};
