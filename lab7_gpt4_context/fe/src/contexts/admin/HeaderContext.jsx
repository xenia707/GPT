import { createContext, useContext, useRef } from "react";
import headerData from "../../mockData/headerData";

const HeaderContext = createContext();
const PostHeaderContext = createContext();

const HeaderContextProvider = ({ children }) => {
  // храним данные по этому блоку с данными в ref,
  // чтобы не вызывать ререндер на каждое изменение значения в инпуте
  const data = useRef(headerData);

  // Возвращаем 2 контекста
  // 1 - для получения данных
  // 2 - для отправки данных на сервер и получения результата
  return (
    <HeaderContext.Provider value={data.current}>
      {children}
    </HeaderContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useHeaderContext = () => useContext(HeaderContext);
const usePostHeaderContext = () => useContext(PostHeaderContext);

export { useHeaderContext, usePostHeaderContext };
export default HeaderContextProvider;
