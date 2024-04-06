import { createContext, useContext, useRef } from "react";
import whatIsGptData from "../../mockData/whatIsGptData";

const WhatIsChatGptContext = createContext();
const PostWhatIsChatGptContext = createContext();

const WhatIsChatGptContextProvider = ({ children }) => {
  const data = useRef(whatIsGptData);

  return (
    <WhatIsChatGptContext.Provider value={data.current}>
      {children}
    </WhatIsChatGptContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useWhatIsChatGptContext = () => useContext(WhatIsChatGptContext);
const usePostWhatIsChatGptContext = () => useContext(PostWhatIsChatGptContext);

export { useWhatIsChatGptContext, usePostWhatIsChatGptContext };
export default WhatIsChatGptContextProvider;
