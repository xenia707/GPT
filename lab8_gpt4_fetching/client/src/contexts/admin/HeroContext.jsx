import { createContext, useContext, useRef, useState } from "react";
import { heroData } from "../../mockData/heroData";

// настройки для запроса
const controller = new AbortController();
const signal = controller.signal;
const endpoint = "hero";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const HeroContext = createContext();
const PostHeroContext = createContext();

const HeroContextProvider = ({ children }) => {
  const data = useRef(heroData);
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
    <HeroContext.Provider value={data.current}>
      <PostHeroContext.Provider value={postData}>
        {children}
      </PostHeroContext.Provider>
    </HeroContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useHeroContext = () => useContext(HeroContext);
const usePostHeroContext = () => useContext(PostHeroContext);

export { useHeroContext, usePostHeroContext };
export default HeroContextProvider;
