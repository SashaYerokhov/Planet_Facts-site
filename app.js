async function loadJson(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error loading JSON ${error.message}`);
  }
}

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
  const planetInfo = root.querySelectorAll(".description-text");
  // console.log(planetInfo);

  // добавляем класс к 1-му рисунку и 1-й кнопке
  buttons[0].classList.add("active");
  planetImages[0].classList.add("active");
  planetInfo[0].classList.add("active");
  buttons[0].setAttribute("aria-selected", "true");
  buttons[0].setAttribute("tabindex", "0");

  function activateTab(button) {
    // деактивировать все кнопки
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });

    // активировать выбранную кнопку
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    button.setAttribute("tabindex", "0");

    // показать нужное изображение
    planetImages.forEach((item) => {
      item.classList.remove("active");
      if (button.dataset.tabTarget === item.id) {
        item.classList.add("active");
      }
    });

    // показать нужный текст (ИСПРАВЛЕНО)
    // planetInfo.forEach((info) => {
    //   info.classList.remove("active");
    //   if (button.dataset.tabTarget === info.id) {
    //     info.classList.add("active"); // <- здесь была ошибка
    //   }
    // });
    // показать нужный текст
    planetInfo.forEach((info) => {
      info.classList.remove("active");
      if (button.dataset.infoTarget === info.id) {
        // Используем новый дата-атрибут
        info.classList.add("active");
      }
    });
  }

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

// document.addEventListener("DOMContentLoaded", () => {
//   loadJson("data.json")
//     .then((data) => {
//       const footerPlanet = document.querySelector('.footer');
//       data.forEach((item) => {
//         const ul = document.createElement('ul');
//         ul.classList.add('antonio-regular');
//         ul.setAttribute('data-qualification', `${item.name}`);
//         ul.innerHTML = `
//             <li>
//               <span class="league-spartan-bold">Rotation Time</span> ${item.rotation}
//             </li>
//             <li>
//               <span class="league-spartan-bold">Revolution Time</span>${item.revolution}
//             </li>
//             <li>
//               <span class="league-spartan-bold">Radius</span>${item.radius}</li>
//             <li>
//               <span class="league-spartan-bold">Average Temp.</span>${item.temperature}</li>
//         `;
//         footerPlanet.appendChild(ul);
//       })
//     })
//     .catch((error) => {
//       console.error("Error loading data", error);
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // 1. Получаем имя планеты из URL-адреса страницы
//   const urlParams = new URLSearchParams(window.location.search);
//   const planetName = urlParams.get('name');

//   if (!planetName) {
//     console.error("Имя планеты не указано в URL");
//     return;
//   }

//   loadJson("data.json")
//     .then((data) => {
//       // 2. Ищем в JSON только нужную планету
//       const item = data.find(p => p.name.toLowerCase() === planetName.toLowerCase());

//       if (!item) {
//         console.error(`Планета с именем ${planetName} не найдена в базе данных`);
//         return;
//       }

//       // 3. Выводим данные найденной планеты
//       const footerPlanet = document.querySelector('.footer');
//       const ul = document.createElement('ul');

//       // Исправлено: в classList.add точка не нужна
//       ul.classList.add('antonio-regular');
//       ul.setAttribute('data-qualification', item.name);

//       ul.innerHTML = `
//           <li>
//             <span class="league-spartan-bold">Rotation Time</span> ${item.rotation}
//           </li>
//           <li>
//             <span class="league-spartan-bold">Revolution Time</span> ${item.revolution}
//           </li>
//           <li>
//             <span class="league-spartan-bold">Radius</span> ${item.radius}
//           </li>
//           <li>
//             <span class="league-spartan-bold">Average Temp.</span> ${item.temperature}
//           </li>
//       `;
//       footerPlanet.appendChild(ul);
//     })
//     .catch((error) => {
//       console.error("Error loading data", error);
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  // 1. Находим тег body и читаем из него имя планеты
  const bodyElement = document.body;
  const planetName = bodyElement.getAttribute("data-planet");

  // Проверка: если открыт файл без этого атрибута (например, контакты или главная)
  if (!planetName) {
    console.warn("На этой странице не задан атрибут data-planet в теге body.");
    return;
  }

  loadJson("data.json")
    .then((data) => {
      // 2. Ищем в JSON-файле планету с таким же именем
      const item = data.find(
        (p) => p.name.toLowerCase() === planetName.toLowerCase(),
      );

      if (!item) {
        console.error(`Планета "${planetName}" не найдена в файле data.json`);
        return;
      }

      const mainPlanet = document.querySelector(".main");
      if (!mainPlanet) {
        console.error("Элемент с классом .main не найден на странице");
        return;
      }

      const section = document.createElement("section");
      section.classList.add("planet__description");
      section.setAttribute("data-content", item.name);

      section.innerHTML = `
      <div
            class="planet__images"
            id="tab-panel-1"
            role="tabpanel"
            aria-labelledby="tab-1"
          >
            <img src="${item.images.planet}" alt="${item.name}" />
          </div>
          <div
            class="planet__images"
            id="tab-panel-2"
            role="tabpanel"
            aria-labelledby="tab-2"
          >
            <img
              src="${item.images.internal}"
              alt="${item.name}"
            />
          </div>
          <div
            class="planet__images bg-images"
            id="tab-panel-3"
            role="tabpanel"
            aria-labelledby="tab-3"
          >
            <img src="${item.images.planet}" alt="${item.name}" />
          </div>
          <div class="description__content">
            <div
              class="description-text"
              id="tab-info-1"
              role="tabpanel"
              aria-labelledby="tab-1"
            >
              <h1 class="antonio-regular">${item.name}</h1>
              <p class="text">
                ${item.overview.content}
              </p>
              <a
                class="links-planet"
                href="${item.overview.source}"
                target="_blank"
                >Source :<span class="league-spartan-bold">Wikipedia</span>
              </a>
            </div>
            <div
              class="description-text"
              id="tab-info-2"
              role="tabpanel"
              aria-labelledby="tab-2"
            >
              <h1 class="antonio-regular">${item.name}</h1>
              <p class="text">
                ${item.structure.content}
              </p>
              <a
                class="links-planet"
                href="${item.structure.source}"
                target="_blank"
                >Source :<span class="league-spartan-bold">Wikipedia</span>
              </a>
            </div>
            <div
              class="description-text"
              id="tab-info-3"
              role="tabpanel"
              aria-labelledby="tab-3"
            >
              <h1 class="antonio-regular">${item.name}</h1>
              <p class="text">
                ${item.geology.content}
              </p>
              <a
                class="links-planet"
                href="${item.geology.source}"
                target="_blank"
                >Source :<span class="league-spartan-bold">Wikipedia</span>
              </a>
            </div>
            <ul class="description-links" role="tablist">
              <li role="presentation">
                <button
                  role="tab"
                  id="tab-1"
                  data-tab-target="tab-panel-1"
                  data-info-target="tab-info-1"
                  aria-selected="false"
                  tabindex="-1"
                >
                  Overview
                </button>
              </li>
              <li role="presentation">
                <button
                  role="tab"
                  id="tab-2"
                  data-tab-target="tab-panel-2"
                  data-info-target="tab-info-2"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <span>Internal</span>Structure
                </button>
              </li>
              <li role="presentation">
                <button
                  role="tab"
                  id="tab-3"
                  data-tab-target="tab-panel-3"
                  data-info-target="tab-info-3"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <span>Surface</span>Geology
                </button>
              </li>
            </ul>
          </div>
      `;
      mainPlanet.appendChild(section);
      // 3. Находим футер и добавляем в него данные
      const footerPlanet = document.querySelector(".footer");
      if (!footerPlanet) {
        console.error("Элемент с классом .footer не найден на странице");
        return;
      }

      const ul = document.createElement("ul");
      ul.classList.add("antonio-regular");
      ul.setAttribute("data-qualification", item.name);

      ul.innerHTML = `
          <li>
            <span class="league-spartan-bold">Rotation Time</span> ${item.rotation}
          </li>
          <li>
            <span class="league-spartan-bold">Revolution Time</span> ${item.revolution}
          </li>
          <li>
            <span class="league-spartan-bold">Radius</span> ${item.radius}
          </li>
          <li>
            <span class="league-spartan-bold">Average Temp.</span> ${item.temperature}
          </li>
      `;
      footerPlanet.appendChild(ul);
      initPlanetComponent();
    })
    
    .catch((error) => {
      console.error("Error loading data", error);
    });
});
