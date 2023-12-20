import brandsData from "../mockData/brandsData";
import googleSvg from "../assets/img/brands/google.svg";
import slackSvg from "../assets/img/brands/slack.svg";
import atlassianSvg from "../assets/img/brands/atlassian.svg";
import dropboxSvg from "../assets/img/brands/dropbox.svg";
import shopifySvg from "../assets/img/brands/shopify.svg";

import useData from "../hooks/useData";

import Preloader from "./Preloader";

export const BrandsImage = ({ brand: { alt } }) => {
  if (alt === "google")
    return <img className="brands_section__img" src={googleSvg} alt={alt} />;

  if (alt === "slack")
    return <img className="brands_section__img" src={slackSvg} alt={alt} />;

  if (alt === "atlassian")
    return <img className="brands_section__img" src={atlassianSvg} alt={alt} />;

  if (alt === "dropbox")
    return <img className="brands_section__img" src={dropboxSvg} alt={alt} />;

  if (alt === "shopify")
    return <img className="brands_section__img" src={shopifySvg} alt={alt} />;
};

export const BrandsTemplate = ({ brandsData }) =>
  brandsData.map((brand, index) => <BrandsImage key={index} brand={brand} />);

const Brands = () => {
  const { isLoading, isError, error, data } = useData({
    endpoint: "brands",
    options: {
      method: "GET",
    },
  });

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;

  return <BrandsTemplate brandsData={data ? data : brandsData} />;
};

export default Brands;
