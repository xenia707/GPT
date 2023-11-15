import { useState } from "react";
import useData from "../../hooks/useData";
import Preloader from "../Preloader";
import {
  useBrandsContext,
  usePostBrandsContext,
} from "../../contexts/admin/BrandsContext";

const AdminBrandsSetSingleItem = ({ item, index }) => {
  const [srcData, setSrcData] = useState(item.src);
  const [altData, setAltData] = useState(item.alt);
  let BrandsContext = useBrandsContext();

  const handleSrcData = (e) => {
    setSrcData(e.target.value);
    BrandsContext[index].src = e.target.value;
  };

  const handleAltData = (e) => {
    setAltData(e.target.value);
    BrandsContext[index].alt = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Маршрут:</label>
        <input type="text" value={srcData} onChange={handleSrcData} />
      </div>
      <div className="block__item">
        <label>Наименование:</label>
        <input type="text" value={altData} onChange={handleAltData} />
      </div>
    </div>
  );
};

const AdminBrandsSet = ({ brands }) => {
  return (
    <div className="admin_container__block">
      <h3>Список брендов:</h3>
      {brands.map((item, index) => (
        <AdminBrandsSetSingleItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const AdminBrands = () => {
  const { isLoading, isError, error, data } = useData({
    endpoint: "brands",
    options: {
      method: "GET",
    },
  });

  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

  const postData = usePostBrandsContext();

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
      <h2>Брэнды.</h2>
      <AdminBrandsSet brands={data} />
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

export default AdminBrands;
