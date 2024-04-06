import { createContext, useContext, useRef, useState } from "react";
import headerData from "../../mockData/headerData";

// настройки для запроса
const controller = new AbortController();
const signal = controller.signal;
const endpoint = "header";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const HeaderContext = createContext();
const PostHeaderContext = createContext();

const HeaderContextProvider = ({ children }) => {
  // храним данные по этому блоку с данными в ref,
  // чтобы не вызывать ререндер на каждое изменение значения в инпуте
  const data = useRef(headerData);
  // храним состояние по результатам запроса к серверу,
  // чтобы обновить блок по результату получения ошибки
  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

  // отправка POST-запроса на сервер
  const postData = async () => {
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    options.body = JSON.stringify(data.current);

    const fetchData = async () => {
      setIsPostDataLoading(true);

      try {
        const response = await fetch(url, options, signal);

        const jsonData = await response.json();

        if (!response.ok) {
          setIsPostDataError(true);
          setPostDataError(jsonData.error);
          return;
        }

        setIsPostDataError(false);
        setPostDataError(null);
      } catch (error) {
        setIsPostDataError(true);
        setPostDataError(error.message);
      }

      setIsPostDataLoading(false);

      return {
        isPostDataLoading,
        isPostDataError,
        postDataError,
      };
    };

    return await fetchData();
  };

  // Возвращаем 2 контекста
  // 1 - для получения данных
  // 2 - для отправки данных на сервер и получения результата
  return (
    <HeaderContext.Provider value={data.current}>
      <PostHeaderContext.Provider value={postData}>
        {children}
      </PostHeaderContext.Provider>
    </HeaderContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useHeaderContext = () => useContext(HeaderContext);
const usePostHeaderContext = () => useContext(PostHeaderContext);

export { useHeaderContext, usePostHeaderContext };
export default HeaderContextProvider;
