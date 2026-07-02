const navbar = document.querySelector("#navbar");
const openButton = document.querySelector("#open__button");

const media = window.matchMedia("(width < 450px)");

function updateNavbar(event) {
  const isMobile = event.matches;
  // console.log(isMobile);
  if (isMobile) {
    navbar.setAttribute("inert", "");
  } else {
    // desktop device
    navbar.removeAttribute("inert");
  }
}
// Если nav - не имеет класс show - он добавляется и меню открывается
//  в противном случае - меню закрывается
function openSidebar() {
  if (navbar.classList.contains("show") === false) {
    navbar.classList.add("show");
    openButton.setAttribute("aria-expanded", true);
    navbar.removeAttribute("inert");
  } else {
    navbar.classList.remove("show");
    openButton.setAttribute("aria-expanded", false);
    navbar.removeAttribute("inert", "");
  }
}

// function closeSidebar() {
//   navbar.classList.remove("show");
//   openButton.setAttribute("aria-expanded", false);
//   navbar.removeAttribute("inert", "");
// }

openButton.addEventListener("click", openSidebar);
// openButton.addEventListener("click", closeSidebar);

updateNavbar(media);

function initPlanetComponent() {
  const root = document.querySelector(".planet__description");
  // console.log(root);
  if (!root) return;
  // обертка для кнопок
  const descriptionLinks = document.querySelector(".description-links");
  // console.log(descriptionLinks);

  const buttons = root.querySelectorAll("li button");
  // console.log(buttons);
  const planetImages = root.querySelectorAll(".planet__images");
  // console.log(planetImages);

  // добавляем класс к 1-му рисунку и 1-й кнопке
  buttons[0].classList.add("active");
  planetImages[0].classList.add("active");
  buttons[0].setAttribute("aria-selected", "true");
  buttons[0].setAttribute("tabindex", "0");

  function activateTab(button) {
    // деактивировать все кнопки
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });

    // активировать все кнопки
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    button.setAttribute("tabindex", "0");

    planetImages.forEach((item) => {
      // console.log(item);
      item.classList.remove("active");
      // console.log(button.dataset.tabTarget);
      // console.log(item.id);  
      if (button.dataset.tabTarget === item.id) {
        item.classList.add("active");
      }
    });
  }

  // buttons.forEach((button, index) => {
  //   button.addEventListener('click', () => {
  //     console.log(123);

  //   })
  // })

  buttons.forEach((button, index) => {
    ["click", "keydown"].forEach((eventType) => {
      button.addEventListener(eventType, (event) => {
        //
        let newIndex = index;
        // console.log(newIndex);

        if (event.key === "ArrowRight") {
          newIndex = (index + 1) % buttons.length;
          console.log(newIndex);
          
        }

        if (event.key === "ArrowLeft") {
          newIndex = (index - 1 + buttons.length) % buttons.length;
        }

        if (newIndex !== index) {
          event.preventDefault();
          buttons[newIndex].focus();
          activateTab(buttons[newIndex]);
          return;
        }

        if (event.key === "Home") newIndex = 0;
        if (event.key === "End") newIndex = buttons.length - 1;

        // activate tabs on click
        if (eventType === "click") {
          activateTab(button);
        }
      });
    });
  });
}
initPlanetComponent();
