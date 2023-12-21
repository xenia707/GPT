import { useState } from "react";
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
    isPostDataLoading: isLoading,
    isPostDataError: isError,
    postDataError: error,
    isSuccess,
    success,
    postDataFunc,
  } = usePostData({ endpoint: "future-here" });

  const handlePostData = (event) => {
    event.preventDefault();
    postDataFunc({ payload: futureHereContext });
  };

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <Preloader />;

  console.log("New data");
  console.log(data);

  return (
    <div className="admin_container admin_Hero">
      <h2>Будущее уже наступило.</h2>
      <AdminBullets futureHereData={data} />
      {isLoading ? (
        <Preloader />
      ) : (
        <button className="btn primary-btn" onClick={handlePostData}>
          Сохранить
        </button>
      )}
      {isError && <div className="error">{JSON.stringify(error)}</div>}
      {isSuccess && <div className="success">{success}</div>}
    </div>
  );
};

export default AdminFutureHere;
