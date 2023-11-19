import { useState } from "react";
import useData from "../../hooks/useData";
import Preloader from "../Preloader";
import {
  useHeroContext,
  usePostHeroContext,
} from "../../contexts/admin/HeroContext";

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
  const { isLoading, isError, error, data } = useData({
    endpoint: "hero",
    options: {
      method: "GET",
    },
  });

  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

  const postData = usePostHeroContext();

  const handlePostData = async () => {
    try {
      setIsPostDataLoading(true);
      const { isPostDataError, postDataError } = await postData();
      setIsPostDataError(isPostDataError);
      setIsPostDataError(postDataError);
    } catch (error) {
      console.log(error);
      setIsPostDataError(isPostDataError);
      setPostDataError(postDataError);
    }
    setIsPostDataLoading(false);
  };

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <Preloader />;

  // console.log("New data");
  // console.log(data);

  return (
    <div className="admin_container admin_Hero">
      <h2>Херо-секция.</h2>
      <AdminHeroHeader header={data.header} description={data.description} />
      <AdminButtons heroCtaButtons={data.heroCtaButtons} />
      <AdminIllustration illustration={data.illustration} />
      <button className="btn primary-btn" onClick={handlePostData}>
        {isPostDataLoading && <Preloader />} Сохранить
      </button>
      {isError && <div className="error">{JSON.stringify(error)}</div>}
      {isPostDataError && (
        <div className="error">{JSON.stringify(postDataError)}</div>
      )}
    </div>
  );
};

export default AdminHero;
