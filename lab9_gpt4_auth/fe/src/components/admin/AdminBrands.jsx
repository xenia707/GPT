import { useState } from "react";
import Preloader from "../Preloader";
import { useBrandsContext } from "../../contexts/admin/BrandsContext";
import usePostData from "../../hooks/usePostData";

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
  const brandsContext = useBrandsContext();

  const {
    postData: data,
    isPostDataLoading: isLoading,
    isPostDataError: isError,
    postDataError: error,
    isSuccess,
    success,
    postDataFunc,
  } = usePostData({ endpoint: "brands" });

  const handlePostData = (event) => {
    event.preventDefault();
    postDataFunc({ payload: brandsContext });
  };

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <Preloader />;

  return (
    <div className="admin_container admin_Hero">
      <h2>Брэнды.</h2>
      <AdminBrandsSet brands={data} />
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

export default AdminBrands;
