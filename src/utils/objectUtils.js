/**
 * Bir nesnenin boş olup olmadığını kontrol eder (hiçbir enumerable property'si yoksa).
 * @param {object} obj - Kontrol edilecek nesne.
 * @returns {boolean} Nesne boşsa true, değilse false.
 */
export const isEmptyObject = (obj) => {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return true; // null, undefined veya nesne olmayanları boş kabul et
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

/**
 * Bir nesnenin derin kopyasını oluşturur.
 * Modern tarayıcılar için `structuredClone` tercih edilebilir.
 * Bu fonksiyon basit JSON-uyumlu nesneler için çalışır. Fonksiyonlar, Date, RegExp, Map, Set gibi
 * özel tipler için doğru çalışmayabilir.
 * @param {object} obj - Kopyalanacak nesne.
 * @returns {object} Nesnenin derin kopyası.
 */
export const deepClone = (obj) => {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(obj);
    } catch (e) {
      // structuredClone bazı tiplerle hata verebilir, bu durumda fallback kullan
      // console.warn("structuredClone failed, falling back to JSON clone:", e);
    }
  }
  // Basit fallback: Sadece JSON-uyumlu veriler için çalışır.
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error("deepClone (JSON fallback) error:", error);
    // Daha karmaşık bir deep clone implementasyonu gerekebilir
    // veya kütüphane (lodash.cloneDeep gibi) kullanılabilir.
    // Şimdilik hata durumunda orijinali döndür veya hata fırlat.
    return obj; // Ya da throw new Error("Deep clone failed for non-JSON serializable object");
  }
};

/**
 * Bir nesneden, nokta (.) ile ayrılmış bir string path kullanarak iç içe geçmiş bir değere güvenli bir şekilde erişir.
 * @param {object} obj - Erişilecek nesne.
 * @param {string} path - Değere giden yol (örn: 'user.address.city').
 * @param {*} [defaultValue=undefined] - Yol bulunamazsa veya geçersizse döndürülecek varsayılan değer.
 * @returns {*} Bulunan değer veya varsayılan değer.
 */
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

/**
 * Bir nesneden null veya undefined değerlere sahip property'leri kaldırarak yeni bir nesne oluşturur.
 * @param {object} obj - Temizlenecek nesne.
 * @returns {object} Null veya undefined değerleri olmayan yeni bir nesne.
 */
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

/**
 * İki nesnenin sığ (shallow) olarak eşit olup olmadığını kontrol eder.
 * @param {object} objA
 * @param {object} objB
 * @returns {boolean}
 */
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
