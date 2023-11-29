export const addToStorage = (key: string, value) => {
  typeof value === "string"
    ? localStorage.setItem(key, value)
    : localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key)!);
};
