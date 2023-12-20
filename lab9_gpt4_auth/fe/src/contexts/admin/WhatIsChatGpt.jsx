import { createContext, useContext, useRef, useState } from "react";
import whatIsGptData from "../../mockData/whatIsGptData";

// настройки для запроса
const controller = new AbortController();
const signal = controller.signal;
const endpoint = "what-is-gpt";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const WhatIsChatGptContext = createContext();
const PostWhatIsChatGptContext = createContext();

const WhatIsChatGptContextProvider = ({ children }) => {
  const data = useRef(whatIsGptData);
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
    <WhatIsChatGptContext.Provider value={data.current}>
      <PostWhatIsChatGptContext.Provider value={postData}>
        {children}
      </PostWhatIsChatGptContext.Provider>
    </WhatIsChatGptContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useWhatIsChatGptContext = () => useContext(WhatIsChatGptContext);
const usePostWhatIsChatGptContext = () => useContext(PostWhatIsChatGptContext);

export { useWhatIsChatGptContext, usePostWhatIsChatGptContext };
export default WhatIsChatGptContextProvider;
