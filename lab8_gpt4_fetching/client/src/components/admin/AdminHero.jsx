import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Preloader from "../Preloader";
import { useHeroContext } from "../../contexts/admin/HeroContext";
import usePostData from "../../hooks/usePostData";

const AdminHeroHeader = (props) => {
  const [headerData, setHeaderData] = useState(props.header);
  const [descriptionData, setDescriptionData] = useState(props.description);
  let heroContext = useHeroContext();

  const handleHeaderData = (e) => {
    setHeaderData(e.target.value);
    heroContext.header = e.target.value;
  };

  const handleDescriptionData = (e) => {
    setDescriptionData(e.target.value);
    heroContext.description = e.target.value;
  };

  return (
    <div className="admin_container__block">
      <h3>Контент:</h3>
      <div className="block__item">
        <label>Заголовок:</label>
        <input
          type="text"
          className="item__long_input"
          value={headerData}
          onChange={handleHeaderData}
        />
      </div>
      <div className="block__item">
        <label>Описание:</label>
        <input
          className="item__long_input"
          type="text"
          value={descriptionData}
          onChange={handleDescriptionData}
        />
      </div>
    </div>
  );
};

const AdminIllustration = ({ illustration }) => {
  const [srcData, setSrcData] = useState(illustration.src);
  const [altData, setAltData] = useState(illustration.alt);
  let heroContext = useHeroContext();

  const handleSrcData = (e) => {
    setSrcData(e.target.value);
    heroContext.illustration.src = e.target.value;
  };

  const handleAltData = (e) => {
    setAltData(e.target.value);
    heroContext.illustration.alt = e.target.value;
  };

  return (
    <div className="admin_container__block">
      <h3>Изображение:</h3>
      <div className="block__item">
        <label>Ссылка:</label>
        <input
          type="text"
          className="item__long_input"
          value={srcData}
          onChange={handleSrcData}
        />
      </div>
      <div className="block__item">
        <label>Описание:</label>
        <input
          type="text"
          className="item__long_input"
          value={altData}
          onChange={handleAltData}
        />
      </div>
    </div>
  );
};

const AdminButtonsSingleButton = ({ item, index }) => {
  const [titleData, setTitleData] = useState(item.title);
  const [typeData, setTypeData] = useState(item.type);
  let heroContext = useHeroContext();

  const handleTitleData = (e) => {
    setTitleData(e.target.value);
    heroContext.heroCtaButtons[index].title = e.target.value;
  };

  const handleTypeData = (e) => {
    setTypeData(e.target.value);
    heroContext.heroCtaButtons[index].type = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Наименование кнопки:</label>
        <input type="text" value={titleData} onChange={handleTitleData} />
      </div>
      <div className="block__item">
        <label>Тип:</label>
        <input type="text" value={typeData} onChange={handleTypeData} />
      </div>
    </div>
  );
};

const AdminButtons = ({ heroCtaButtons }) => {
  return (
    <div className="admin_container__block">
      <h3>Кнопки:</h3>
      {heroCtaButtons.map((item, index) => (
        <AdminButtonsSingleButton key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const AdminHero = () => {
  const heroContext = useHeroContext();

  const {
    postData: data,
    status,
    statusDescription,
    postDataFunc,
  } = usePostData({ endpoint: "hero" });

  useEffect(() => {
    if (status === "success" || status === "error") toast(statusDescription);
  }, [status, statusDescription]);

  const handlePostData = (e) => {
    e.preventDefault();
    postDataFunc({ payload: heroContext });
  };

  if (status === "loading") return <Preloader />;
  if (!data)
    return (
      <div>
        <h3>Данные не загружены</h3>
      </div>
    );

  return (
    <div className="admin_container admin_Hero">
      <h2>Херо-секция.</h2>
      <AdminHeroHeader header={data.header} description={data.description} />
      <AdminButtons heroCtaButtons={data.heroCtaButtons} />
      <AdminIllustration illustration={data.illustration} />
      <button className="btn primary-btn" onClick={handlePostData}>
        Сохранить
      </button>
    </div>
  );
};

export default AdminHero;
