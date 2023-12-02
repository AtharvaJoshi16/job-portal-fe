import { useMediaQuery } from "react-responsive";

export const useReactResponsive = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isPhone = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const isDesktopLarge = useMediaQuery({
    query: "(min-width: 1440px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return {
    isDesktop,
    isPhone,
    isDesktopLarge,
    isTablet,
  };
};
