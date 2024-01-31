export const updateScreenSize = (): string => {
  let isMobileSize;
  if (window.innerWidth < 768) {
    isMobileSize = true;
  } else {
    isMobileSize = false;
  }

  return isMobileSize;
};
