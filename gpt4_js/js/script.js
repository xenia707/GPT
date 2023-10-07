// вешаем на окно прослушку загрузки DOM-дерева
// по окнчании загрузки, будет запущена функция

const initBurger = () => {
  // ищем ноды (элементы DOM-дерева) для их получения для последующих манипуляций
  const burgerNode = document.querySelector(".header__burger_menu");
  const headerMenuNode = document.querySelector(".header__right");
  const closeMenuNode = document.querySelector(".menu__close");
  const bodyNode = document.querySelector("body");

  // блокируем и разблокируем скролл во время открытия модального окна
  const noOverflow = () => bodyNode.classList.add("oh");
  const overflow = () => bodyNode.classList.remove("oh");

  // показываем и скрываем меню
  const showMenu = () => headerMenuNode.classList.remove("hidden");
  const hideMenu = () => headerMenuNode.classList.add("hidden");

  // показываем и скрываем бургер
  const hideBurger = () => {
    burgerNode.classList.add("hidden");
    closeMenuNode.classList.add("hidden");
    showMenu();
    overflow();
  };

  const showBurger = () => {
    burgerNode.classList.remove("hidden");
    closeMenuNode.classList.remove("hidden");
    hideMenu();
    overflow();
  };

  // обновляем состояние бургера при ресайзе окна
  const updateBurgerState = () => {
    const width = window.innerWidth;
    console.log("width: ", width);

    if (width <= 1024) return showBurger();

    return hideBurger();
  };

  // выполняем ресайз окна на старте для получения корректного состояния меню при загрузке страницы
  updateBurgerState();

  // вешаем прослушку события резсайза для обновления состояния бургера
  window.addEventListener("resize", updateBurgerState);

  // обработчик закрытия меню
  const handleCloseMenu = () => {
    overflow();
    hideMenu();
  };

  // обработчик клика на бургер
  const handleBurgerClick = () => {
    if (headerMenuNode.classList.contains("hidden")) {
      noOverflow();
      return showMenu();
    }

    handleCloseMenu();
  };

  // вешаем прослушку клика по бургеру
  burgerNode.addEventListener("click", handleBurgerClick);

  // вешаем прослушку на клик по кнопке "Закрыть меню"
  closeMenuNode.addEventListener("click", handleCloseMenu);
};

window.onload = () => {
  initBurger();

  const bodyNode = document.querySelector("body");

  const futurHere = [
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
    {
      title: "Мгновенное улучшение ситуации с недоверием",
      description:
        "От них прекрасный Джон, он дает богатого. Они стареют и рисуют миссис нравиться. Улучшение ситуации с недоверием может мгновенно стать домохозяйством. аплодировал.",
    },
  ];

  const rightContainerTemplate = ({ title, description }) => {
    const template = `
     <div class="right__container">
       <h3 class="container__header lined_header">
        ${title}
       </h3>
       <p class="container__content">
        ${description}
       </p>
     </div>
    `;

    return template;
  };

  const futureHereTemplate = (data) => {
    console.log(data);
    const rightContainerTpl = data.map((item) => rightContainerTemplate(item));

    const parentTemplate = `
      <div class="future_here__left">
        <h2 class="left__header">
          Будущее Уже Наступило и Тебе Нужно Лишь Осознать. Шагни в Будущее и
          Воплоти Его.
        </h2>
        <a href="#" class="left__cta">Запросить ранний доступ</a>
      </div>
    `;

    return parentTemplate + rightContainerTpl;
  };

  bodyNode.insertAdjacentHTML("beforeend", futureHereTemplate(futurHere));
};
