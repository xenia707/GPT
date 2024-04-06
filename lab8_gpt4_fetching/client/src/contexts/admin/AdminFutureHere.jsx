import { createContext, useContext, useRef, useState } from "react";
import brandsData from "../../mockData/brandsData";

// настройки для запроса
const controller = new AbortController();
const signal = controller.signal;
const endpoint = "brands";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const BrandsContext = createContext();
const PostBrandsContext = createContext();

const BrandsContextProvider = ({ children }) => {
  const data = useRef(brandsData);
  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);

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
    <BrandsContext.Provider value={data.current}>
      <PostBrandsContext.Provider value={postData}>
        {children}
      </PostBrandsContext.Provider>
    </BrandsContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useBrandsContext = () => useContext(BrandsContext);
const usePostBrandsContext = () => useContext(PostBrandsContext);

export { useBrandsContext, usePostBrandsContext };
export default BrandsContextProvider;
