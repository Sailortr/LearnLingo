export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  } catch (error) {
    console.error(`localStorageHelper getItem error for key "${key}":`, error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    const valueToStore =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value);
    localStorage.setItem(key, valueToStore);
    return true;
  } catch (error) {
    console.error(`localStorageHelper setItem error for key "${key}":`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(
      `localStorageHelper removeItem error for key "${key}":`,
      error
    );
    return false;
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("localStorageHelper clearAll error:", error);
    return false;
  }
};
