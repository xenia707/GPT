import { createContext, useContext, useRef } from "react";
import futureHereData from "../../mockData/futureHereData";

const FutureHereContext = createContext();
const PostFutureHereContext = createContext();

const FutureHereContextProvider = ({ children }) => {
  const data = useRef(futureHereData);

  // Возвращаем 2 контекста
  // 1 - для получения данных
  // 2 - для отправки данных на сервер и получения результата
  return (
    <FutureHereContext.Provider value={data.current}>
      {children}
    </FutureHereContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useFutureHereContext = () => useContext(FutureHereContext);
const usePostFutureHereContext = () => useContext(PostFutureHereContext);

export { useFutureHereContext, usePostFutureHereContext };
export default FutureHereContextProvider;
