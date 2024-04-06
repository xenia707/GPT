import { Link } from "react-router-dom";

import headerData from "../mockData/headerData";
import Logo from "../assets/img/logo.svg";

import useData from "../hooks/useData";
import useBurger, { overflow, noOverflow } from "../hooks/useBurger";
import Preloader from "./Preloader";

export const LogoTemplate = ({ logoData }) => {
  const { alt, href } = logoData;

  return (
    <div className="header__logo">
      <a href={href} className="logo__link">
        <img className="link__name" src={Logo} alt={alt} />
      </a>
    </div>
  );
};

export const BurgerTemplate = ({ isBurgerActive, setIsMenuShown }) => (
  <div
    className={
      isBurgerActive ? "header__burger_menu " : "header__burger_menu hidden"
    }
    onClick={() => {
      setIsMenuShown(true);
      noOverflow();
    }}
  >
    <div className="burger_menu__line"></div>
    <div className="burger_menu__line"></div>
    <div className="burger_menu__line"></div>
  </div>
);

export const MenuItemTemplate = ({ menuItemData }) => {
  const { type, title, href } = menuItemData;

  const handleClick = () => {
    if (href === "#") return;

    const toNode = document.querySelector(`${href}`);

    try {
      toNode.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  if (type === "button")
    return (
      <li className="menu__item">
        <button className="item__link" onClick={handleClick}>
          {title}
        </button>
      </li>
    );

  if (type === "link")
    return (
      <li className="menu__item">
        <Link to={href} className="item__link">
          {title}
        </Link>
      </li>
    );
};

export const ButtonTemplate = ({ buttonData }) => {
  const { title, href, isPrimary } = buttonData;

  return (
    <a href={href}>
      <button
        className={`cta_buttons__signin btn${isPrimary ? " primary-btn" : ""}`}
      >
        {title}
      </button>
    </a>
  );
};

// функция создания шаблона с параметрами правой части меню
export const RightHeaderTemplate = ({
  rightHeaderData,
  isBurgerActive,
  isMenuShown,
  setIsMenuShown,
}) => {
  const { menuData, buttonsData } = rightHeaderData;

  return (
    <>
      <div className={isMenuShown ? "header__right" : "header__right hidden"}>
        <aside className="header__menu">
          <div
            className={isBurgerActive ? "menu__close" : "menu__close hidden"}
            onClick={() => {
              setIsMenuShown(false);
              overflow();
            }}
          >
            <div className="menu__line"></div>
            <div className="menu__line"></div>
          </div>
          <ul className="menu">
            {menuData.map((item, index) => (
              <MenuItemTemplate key={index} menuItemData={item} />
            ))}
          </ul>
        </aside>
        <div className="cta_buttons">
          {buttonsData.map((button, index) => (
            <ButtonTemplate key={index} buttonData={button} />
          ))}
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const { isBurgerActive, isMenuShown, setIsMenuShown } = useBurger();

  const { isError, error, data, isLoading } = useData({
    endpoint: "header",
    options: {
      method: "GET",
    },
  });

  const { logoData, menuData, buttonsData } = headerData;

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;

  return (
    <>
      <LogoTemplate logoData={data?.logoData ? data.logoData : logoData} />
      <BurgerTemplate
        isBurgerActive={isBurgerActive}
        setIsMenuShown={setIsMenuShown}
      />
      <RightHeaderTemplate
        rightHeaderData={{
          menuData: data?.menuData ? data.menuData : menuData,
          buttonsData: data?.buttonsData ? data.buttonsData : buttonsData,
        }}
        isBurgerActive={isBurgerActive}
        isMenuShown={isMenuShown}
        setIsMenuShown={setIsMenuShown}
      />
    </>
  );
};

export default Header;
