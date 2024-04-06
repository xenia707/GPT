import { useState } from "react";
import useData from "../../hooks/useData";
import Preloader from "../Preloader";
import {
  useFutureHereContext,
  usePostFutureHereContext,
} from "../../contexts/admin/FutureHereContext";

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
  const { isLoading, isError, error, data } = useData({
    endpoint: "future-here",
    options: {
      method: "GET",
    },
  });

  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

  const postData = usePostFutureHereContext();

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

  console.log("New data");
  console.log(data);

  return (
    <div className="admin_container admin_Hero">
      <h2>Будущее уже наступило.</h2>
      {/* <AdminHeroHeader header={data.header} description={data.description} /> */}
      <AdminBullets futureHereData={data} />
      {/* <AdminIllustration illustration={data.illustration} /> */}
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

export default AdminFutureHere;
