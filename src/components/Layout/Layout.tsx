import { useReactResponsive } from "@/hooks/useReactResponsive.hooks";
import Header from "../Header";
import { BottomNav } from "../../customs/BottomNav/BottomNav";
import { useState } from "react";
import { NavContext } from "../../customs/BottomNav/nav.context";

const Layout = ({ children }) => {
  const { isPhone, isTablet } = useReactResponsive();
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <NavContext.Provider value={{ activeIndex, setActiveIndex }}>
      <Header />
      {children}
      {(isPhone || isTablet) && <BottomNav />}
    </NavContext.Provider>
  );
};

export default Layout;
