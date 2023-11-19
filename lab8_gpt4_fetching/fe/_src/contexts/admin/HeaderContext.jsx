import { createContext, useContext, useRef } from "react";
import headerData from "../../mockData/headerData";

const endpoint = "header";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

const HeaderContext = createContext();
const PostHeaderContext = createContext();

const HeaderContextProvider = ({ children }) => {
  // храним данные по этому блоку с данными в ref,
  // чтобы не вызывать ререндер на каждое изменение значения в инпуте
  const data = useRef(headerData);

  const postData = async (data) => {
    const isPostDataError = false;
    const postDataError = null;

    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;

    const fetchData = async () => {
      options.body = JSON.stringify(data);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          // throw new Error("Response is not ok");
          console.log(response);
        }

        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        throw new Error(error);
      }
    };

    await fetchData();

    return {
      isPostDataError,
      postDataError,
    };
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
