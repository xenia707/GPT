import { useState } from "react";
import useData from "../../hooks/useData";
import Preloader from "../Preloader";
import {
  useHeaderContext,
  usePostHeaderContext,
} from "../../contexts/admin/HeaderContext";

const AdminLogoData = ({ logoData }) => {
  const [altData, setAltData] = useState(logoData.alt);
  const [srcData, setSrcData] = useState(logoData.src);
  const [hrefData, setHrefData] = useState(logoData.href);
  let headerContext = useHeaderContext();

  const handleAltData = (e) => {
    setAltData(e.target.value);
    headerContext.logoData.alt = e.target.value;
  };
  const handleSrcData = (e) => {
    setSrcData(e.target.value);
    headerContext.logoData.src = e.target.value;
  };
  const handleHrefData = (e) => {
    setHrefData(e.target.value);
    headerContext.logoData.href = e.target.value;
  };

  // console.log("HeaderContext");
  // console.log(useHeaderContext());

  return (
    <div className="admin_container__block">
      <h3>Логотип:</h3>
      <div className="block__item">
        <label>Наименование изображения:</label>
        <input type="text" value={altData} onChange={handleAltData} />
      </div>
      <div className="block__item">
        <label>Маршрут изображения:</label>
        <input type="text" value={srcData} onChange={handleSrcData} />
      </div>
      <div className="block__item">
        <label>Ссылка изображения:</label>
        <input type="text" value={hrefData} onChange={handleHrefData} />
      </div>
    </div>
  );
};

const AdminMenuLink = ({ item }) => {
  const [titleData, setTitleData] = useState(item.title);
  const [typeData, setTypeData] = useState(item.type);
  const [hrefData, setHrefData] = useState(item.href);
  let headerContext = useHeaderContext();

  const handleTitleData = (e) => {
    setTitleData(e.target.value);
    headerContext.logoData.title = e.target.value;
  };
  const handleTypeData = (e) => {
    setTypeData(e.target.value);
    headerContext.logoData.src = e.target.value;
  };
  const handleHrefData = (e) => {
    setHrefData(e.target.value);
    headerContext.logoData.href = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Наименование:</label>
        <input type="text" value={titleData} onChange={handleTitleData} />
      </div>
      <div className="block__item">
        <label>Тип:</label>
        <input type="text" value={typeData} onChange={handleTypeData} />
      </div>
      <div className="block__item">
        <label>Ссылка:</label>
        <input type="text" value={hrefData} onChange={handleHrefData} />
      </div>
    </div>
  );
};

const AdminMenu = ({ menuData }) => {
  // console.log("menuData");
  // console.log(menuData);
  return (
    <div className="admin_container__block">
      <h3>Меню шапки:</h3>{" "}
      {menuData.map((item, index) => (
        <AdminMenuLink key={index} item={item} />
      ))}
    </div>
  );
};

const AdminButtonsSingleButton = ({ item, index }) => {
  const [titleData, setTitleData] = useState(item.title);
  const [hrefData, setHrefData] = useState(item.href);
  const [isPrimaryData, setIsPrimaryData] = useState(item.isPrimary);
  let headerContext = useHeaderContext();

  const handleTitleData = (e) => {
    setTitleData(e.target.value);
    headerContext.buttonsData[index].title = e.target.value;
  };

  const handleHrefData = (e) => {
    setHrefData(e.target.value);
    headerContext.buttonsData[index].href = e.target.value;
  };

  const handleIsPrimaryData = (e) => {
    setIsPrimaryData(e.target.value);
    headerContext.buttonsData[index].isPrimary = e.target.value;
  };

  // console.log("HeaderContext");
  // console.log(useHeaderContext());

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Наименование кнопки:</label>
        <input type="text" value={titleData} onChange={handleTitleData} />
      </div>
      <div className="block__item">
        <label>Ссылка:</label>
        <input type="text" value={hrefData} onChange={handleHrefData} />
      </div>
      <div className="block__item">
        <label>Главная кнопка:</label>
        <input
          type="text"
          value={isPrimaryData}
          onChange={handleIsPrimaryData}
        />
      </div>
    </div>
  );
};

const AdminButtons = ({ buttonsData }) => {
  return (
    <div className="admin_container__block">
      <h3>Кнопки:</h3>
      {buttonsData.map((item, index) => (
        <AdminButtonsSingleButton key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const AdminHeader = () => {
  const { isLoading, isError, error, data } = useData({
    endpoint: "header",
    options: {
      method: "GET",
    },
  });

  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

  const postData = usePostHeaderContext();

  const handlePostData = async () => {
    try {
      setIsPostDataLoading(true);
      const { isPostDataError, postDataError } = await postData();

      setIsPostDataError(isPostDataError);
      setPostDataError(postDataError);
    } catch (error) {
      console.log(error);
      setIsPostDataError(true);
      setPostDataError(error.message);
    }
    setIsPostDataLoading(false);
  };

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <Preloader />;

  // console.log("New data");
  // console.log(data);

  return (
    <div className="admin_container admin_header">
      <h2>Шапка страницы.</h2>
      <AdminLogoData logoData={data.logoData} />
      <AdminMenu menuData={data.menuData} />
      <AdminButtons buttonsData={data.buttonsData} />
      <button className="btn primary-btn" onClick={handlePostData}>
        {isPostDataLoading ? <Preloader /> : ""} Сохранить
      </button>
      {isError && <div className="error">{JSON.stringify(error)}</div>}
      {isPostDataError && (
        <div className="error">{JSON.stringify(postDataError)}</div>
      )}
    </div>
  );
};

export default AdminHeader;
