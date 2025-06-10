/**
 * localStorage'dan bir öğe alır ve JSON ise parse eder.
 * @param {string} key - Alınacak öğenin anahtarı.
 * @returns {*} Anahtarın değeri veya bulunamazsa/hata oluşursa null.
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    // JSON parse etmeyi dene, başarısız olursa ham değeri döndür
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

/**
 * localStorage'a bir öğe ekler. Değer bir nesne veya dizi ise JSON olarak stringify eder.
 * @param {string} key - Eklenecek öğenin anahtarı.
 * @param {*} value - Eklenecek değer.
 * @returns {boolean} İşlem başarılıysa true, değilse false.
 */
export const setItem = (key, value) => {
  try {
    const valueToStore =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value); // String olmayan primitive'leri string'e çevir
    localStorage.setItem(key, valueToStore);
    return true;
  } catch (error) {
    console.error(`localStorageHelper setItem error for key "${key}":`, error);
    // Olası hatalar: localStorage dolu olabilir (QuotaExceededError)
    return false;
  }
};

/**
 * localStorage'dan bir öğeyi kaldırır.
 * @param {string} key - Kaldırılacak öğenin anahtarı.
 * @returns {boolean} İşlem başarılıysa true, değilse false.
 */
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

/**
 * localStorage'daki tüm öğeleri temizler. (Dikkatli kullanılmalı!)
 * @returns {boolean} İşlem başarılıysa true, değilse false.
 */
export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("localStorageHelper clearAll error:", error);
    return false;
  }
};
