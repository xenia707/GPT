import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Preloader from "../Preloader";
import { useFutureHereContext } from "../../contexts/admin/FutureHereContext";
import usePostData from "../../hooks/usePostData";

const AdminButtonsSingleButton = ({ item, index }) => {
  const [titleData, setTitleData] = useState(item.title);
  const [descriptionData, setDescriptionData] = useState(item.description);
  let futureHereContext = useFutureHereContext();

  const handleTitleData = (e) => {
    setTitleData(e.target.value);
    futureHereContext[index].title = e.target.value;
  };

  const handleDescriptionData = (e) => {
    setDescriptionData(e.target.value);
    futureHereContext[index].description = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Наименование:</label>
        <input type="text" value={titleData} onChange={handleTitleData} />
      </div>
      <div className="block__item">
        <label>Описание:</label>
        <input
          type="text"
          value={descriptionData}
          onChange={handleDescriptionData}
        />
      </div>
    </div>
  );
};

const AdminBullets = ({ futureHereData }) => {
  return (
    <div className="admin_container__block">
      <h3>Кнопки:</h3>
      {futureHereData.map((item, index) => (
        <AdminButtonsSingleButton key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const AdminFutureHere = () => {
  const futureHereContext = useFutureHereContext();

  const {
    postData: data,
    status,
    statusDescription,
    postDataFunc,
  } = usePostData({ endpoint: "future-here" });

  useEffect(() => {
    if (status === "success" || status === "error") toast(statusDescription);
  }, [status, statusDescription]);

  const handlePostData = (e) => {
    e.preventDefault();
    postDataFunc({ payload: futureHereContext });
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
      <h2>Будущее уже наступило.</h2>
      <AdminBullets futureHereData={data} />
      <button className="btn primary-btn" onClick={handlePostData}>
        Сохранить
      </button>
    </div>
  );
};

export default AdminFutureHere;
