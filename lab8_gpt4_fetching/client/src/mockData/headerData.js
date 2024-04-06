export const menuData = [
  {
    type: "button",
    title: "Главная",
    href: "#main",
  },
  {
    type: "button",
    title: "Что такое GPT?",
    href: "#what_is",
  },
  {
    type: "button",
    title: "Open AI",
    href: "#future",
  },
  {
    type: "link",
    title: "Кейсы",
    href: "/cases",
  },
  {
    type: "button",
    title: "Библиотека",
    href: "/library",
  },
];

export const buttonsData = [
  {
    title: "Войти",
    href: "#",
    isPrimary: false,
  },
  {
    title: "Регистрация",
    href: "#",
    isPrimary: true,
  },
];

export const logoData = {
  alt: "logo",
  src: "./assets/img/logo.svg",
  href: "#",
};

const headerData = {
  logoData,
  menuData,
  buttonsData,
};

export default headerData;
