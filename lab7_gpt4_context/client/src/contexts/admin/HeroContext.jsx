import { createContext, useContext, useRef } from "react";
import heroData from "../../mockData/heroData";

const HeroContext = createContext();
const PostHeroContext = createContext();

const HeroContextProvider = ({ children }) => {
  const data = useRef(heroData);

  return (
    <HeroContext.Provider value={data.current}>{children}</HeroContext.Provider>
  );
};

// кастомные хуки для простоты получения
const useHeroContext = () => useContext(HeroContext);
const usePostHeroContext = () => useContext(PostHeroContext);

export { useHeroContext, usePostHeroContext };
export default HeroContextProvider;
