export const isEmptyObject = (obj) => {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

export const deepClone = (obj) => {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(obj);
    } catch (e) {}
  }
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error("deepClone (JSON fallback) error:", error);
    return obj;
  }
};

export const getNestedValue = (obj, path, defaultValue = undefined) => {
  if (!obj || typeof path !== "string") {
    return defaultValue;
  }
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (
      result === null ||
      typeof result !== "object" ||
      !Object.prototype.hasOwnProperty.call(result, key)
    ) {
      return defaultValue;
    }
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
};

export const removeNullOrUndefinedValues = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const newObj = {};
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== null &&
      obj[key] !== undefined
    ) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]
    ) {
      return false;
    }
  }
  return true;
};
