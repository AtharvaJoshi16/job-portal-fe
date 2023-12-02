import { Dispatch, SetStateAction, createContext } from "react";

type NavContextProps = {
  activeIndex: number;
  setActiveIndex?: Dispatch<SetStateAction<number>>;
};

export const NavContext = createContext<NavContextProps>({
  activeIndex: 0,
  setActiveIndex: () => {},
});
