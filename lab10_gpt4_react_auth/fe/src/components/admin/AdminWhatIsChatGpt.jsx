import { useState } from "react";

import Preloader from "../Preloader";
import { useWhatIsChatGptContext } from "../../contexts/admin/WhatIsChatGptContext";
import usePostData from "../../hooks/usePostData";

const AdminwhatIsGptTop = ({ whatIsGptTopData }) => {
  const [headerData, setHeaderData] = useState(whatIsGptTopData.header);
  const [descriptionData, setDescriptionData] = useState(
    whatIsGptTopData.content
  );
  let whatIsChatGptContext = useWhatIsChatGptContext();

  const handleHeaderData = (e) => {
    setHeaderData(e.target.value);
    whatIsChatGptContext.whatIsGptTopData.header = e.target.value;
  };

  const handleDescriptionData = (e) => {
    setDescriptionData(e.target.value);
    whatIsChatGptContext.whatIsGptTopData.description = e.target.value;
  };

  return (
    <div className="admin_container__block">
      <h3>Верхние данные:</h3>
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

const AdminWhatIsGptMiddleButton = ({ button }) => {
  const [titleData, setTitleData] = useState(button.title);
  const [hrefData, setHrefData] = useState(button.href);
  let whatIsChatGptContext = useWhatIsChatGptContext();

  const handleTitleData = (e) => {
    setTitleData(e.target.value);
    whatIsChatGptContext.whatIsGptMiddleData.button.title = e.target.value;
  };

  const handleHrefData = (e) => {
    setHrefData(e.target.value);
    whatIsChatGptContext.whatIsGptMiddleData.button.href = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Наименование кнопки:</label>
        <input type="text" value={titleData} onChange={handleTitleData} />
      </div>
      <div className="block__item">
        <label>Тип:</label>
        <input type="text" value={hrefData} onChange={handleHrefData} />
      </div>
    </div>
  );
};

const AdminWhatIsGptMiddle = ({ whatIsGptMiddleData }) => {
  const [headerData, setHeaderData] = useState(whatIsGptMiddleData.header);
  let whatIsChatGptContext = useWhatIsChatGptContext();

  const handleHeaderData = (e) => {
    setHeaderData(e.target.value);
    whatIsChatGptContext.whatIsGptMiddleData.header = e.target.value;
  };

  return (
    <div className="admin_container__block">
      <h3>Центральные данные:</h3>
      <div className="block__item">
        <label>Заголовок:</label>
        <input
          type="text"
          className="item__long_input"
          value={headerData}
          onChange={handleHeaderData}
        />
      </div>
      <h3>Кнопка:</h3>
      <AdminWhatIsGptMiddleButton button={whatIsGptMiddleData.button} />
    </div>
  );
};

const AdminButtonsSingleButton = ({ item, index }) => {
  const [headerData, setHeaderData] = useState(item.header);
  const [contentData, setContentData] = useState(item.content);
  let whatIsChatGptContext = useWhatIsChatGptContext();

  const handleHeaderData = (e) => {
    setHeaderData(e.target.value);
    whatIsChatGptContext.whatIsGptBottomData[index].header = e.target.value;
  };

  const handleContentData = (e) => {
    setContentData(e.target.value);
    whatIsChatGptContext.whatIsGptBottomData[index].content = e.target.value;
  };

  return (
    <div className="block__card">
      <div className="block__item">
        <label>Заголовок:</label>
        <input type="text" value={headerData} onChange={handleHeaderData} />
      </div>
      <div className="block__item">
        <label>Описание:</label>
        <input
          type="text"
          className="item__long_input"
          value={contentData}
          onChange={handleContentData}
        />
      </div>
    </div>
  );
};

const AdminWhatIsGptBottom = ({ whatIsGptBottomData }) => {
  return (
    <div className="admin_container__block">
      <h3>Нижние данные:</h3>
      {whatIsGptBottomData.map((item, index) => (
        <AdminButtonsSingleButton key={index} item={item} index={index} />
      ))}
    </div>
  );
};

const AdminWhatIsChatGpt = () => {
  const whatIsGptContext = useWhatIsChatGptContext();

  const {
    postData: data,
    isPostDataLoading: isLoading,
    isPostDataError: isError,
    postDataError: error,
    isSuccess,
    success,
    postDataFunc,
  } = usePostData({ endpoint: "what-is-gpt" });

  const handlePostData = (event) => {
    event.preventDefault();
    postDataFunc({ payload: whatIsGptContext });
  };

  if (isLoading) return <Preloader />;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!data) return <Preloader />;

  return (
    <div className="admin_container admin_Hero">
      <h2>Что такое Chat Gpt.</h2>
      <AdminwhatIsGptTop whatIsGptTopData={data.whatIsGptTopData} />
      <AdminWhatIsGptMiddle whatIsGptMiddleData={data.whatIsGptMiddleData} />
      <AdminWhatIsGptBottom whatIsGptBottomData={data.whatIsGptBottomData} />
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

export default AdminWhatIsChatGpt;
