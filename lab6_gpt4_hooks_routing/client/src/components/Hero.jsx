import { heroData } from "../mockData/heroData";
import IllustrationSvg from "../assets/img/Illustration.svg";
import useData from "../hooks/useData";
import Preloader from "./Preloader";

export const HeaderTemplate = ({ header }) => {
  return <h1 className="left__header">{header}</h1>;
};

export const DescriptionTemplate = ({ description }) => {
  return <p className="left__description">{description}</p>;
};

export const ButtonTemplate = ({ ctaButton }) => {
  const { type, title } = ctaButton;

  switch (type) {
    case "input":
      return <input type="text" placeholder={title} />;

    case "button":
      return (
        <button className="cta_buttons__signin btn primary-btn">{title}</button>
      );

    default:
      return ``;
  }
};

export const ButtonsTemplate = ({ ctaButtons }) => {
  return (
    <div className="left__cta_buttons">
      {ctaButtons.map((ctaButton, index) => (
        <ButtonTemplate key={index} ctaButton={ctaButton} />
      ))}
    </div>
  );
};

export const IllustrationTemplate = ({ illustration }) => {
  const { alt } = illustration;

  return <img src={IllustrationSvg} alt={alt} />;
};

const Hero = () => {
  const { header, description, illustration, heroCtaButtons } = heroData;

  const { isLoading, isError, error, data } = useData({
    endpoint: "hero",
    options: {
      method: "GET",
    },
  });

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;

  return (
    <>
      <div className="hero_section__left">
        <HeaderTemplate header={data?.header ? data.header : header} />
        <DescriptionTemplate
          description={data?.description ? data.description : description}
        />
        <ButtonsTemplate
          ctaButtons={
            data?.heroCtaButtons ? data.heroCtaButtons : heroCtaButtons
          }
        />
      </div>
      <div className="hero_section__right">
        <IllustrationTemplate
          illustration={data?.illustration ? data.illustration : illustration}
        />
      </div>
    </>
  );
};

export default Hero;
